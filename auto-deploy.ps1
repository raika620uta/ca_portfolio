# ============================================
# auto-deploy.ps1 -- File Watcher + Auto Deploy
# Watches the repository for file changes.
# After 30 seconds of inactivity, runs git add/commit/push.
# All log messages are in English to avoid encoding issues.
# ============================================

param(
    [int]$DebounceSeconds = 30
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# --- Exclude patterns ---
$excludeDirs = @('.git', 'node_modules', '.vscode', 'dist', 'build', '.next', '.cache', '__pycache__')

# --- Helper: colored log ---
function Write-Log {
    param([string]$Message, [string]$Color = 'Gray')
    $ts = Get-Date -Format 'HH:mm:ss'
    Write-Host "[$ts] $Message" -ForegroundColor $Color
}

# --- Helper: check if path should be excluded ---
function Test-Excluded {
    param([string]$FilePath)
    foreach ($dir in $excludeDirs) {
        $escaped = [regex]::Escape($dir)
        if ($FilePath -match "(\\|/)$escaped(\\|/)") { return $true }
    }
    if ($FilePath -match '\.(log|tmp)$') { return $true }
    if ($FilePath -match '~$') { return $true }
    return $false
}

# --- Deploy function ---
function Invoke-Deploy {
    Write-Log '--- Deploy sequence started ---' Cyan

    Push-Location $repoRoot
    try {
        # Check for actual changes
        $status = git status --porcelain 2>&1
        if (-not $status) {
            Write-Log 'No changes detected. Skipping deploy.' Yellow
            return
        }

        Write-Log "Changes detected:" White
        $status | ForEach-Object { Write-Log "  $_" DarkGray }

        # Stage all
        git add -A 2>&1 | Out-Null
        Write-Log 'git add -A ... done' Green

        # Commit with timestamp
        $msg = "Update: " + (Get-Date -Format 'yyyy-MM-dd HH:mm')
        $commitResult = git commit -m $msg 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Log "git commit failed: $commitResult" Red
            return
        }
        Write-Log "git commit ... done" Green

        # Push
        Write-Log 'git push ... (this may take a moment)' Yellow
        $pushResult = git push 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Log "git push failed: $pushResult" Red
            return
        }
        Write-Log 'git push ... done' Green
        Write-Log '--- Deploy complete! ---' Cyan
    }
    catch {
        Write-Log "Error during deploy: $_" Red
    }
    finally {
        Pop-Location
    }
}

# === Main: File System Watcher ===
Write-Host ''
Write-Log '========================================' Cyan
Write-Log '  Auto-Deploy Watcher' Cyan
Write-Log '========================================' Cyan
Write-Log "Watching: $repoRoot" White
Write-Log "Debounce: ${DebounceSeconds}s after last change" White
$excludeList = $excludeDirs -join ', '
Write-Log "Excluded: $excludeList" DarkGray
Write-Log 'Press Ctrl+C to stop.' Yellow
Write-Host ''

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $repoRoot
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $false
$nf = [System.IO.NotifyFilters]::FileName -bor [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::DirectoryName
$watcher.NotifyFilter = $nf

$lastChangeTime = $null
$pending = $false

try {
    $watcher.EnableRaisingEvents = $true
    Write-Log 'Watcher started. Waiting for file changes...' Green

    while ($true) {
        # Poll for events (WaitForChanged with 1s timeout)
        $result = $watcher.WaitForChanged([System.IO.WatcherChangeTypes]::All, 1000)

        if (-not $result.TimedOut) {
            $changedPath = $result.Name
            if (-not (Test-Excluded $changedPath)) {
                $lastChangeTime = Get-Date
                if (-not $pending) {
                    Write-Log "Change detected: $changedPath" White
                    $pending = $true
                }
                else {
                    Write-Log "  + $changedPath" DarkGray
                }
            }
        }

        # Check debounce timer
        if ($pending -and $lastChangeTime) {
            $elapsed = (Get-Date) - $lastChangeTime
            if ($elapsed.TotalSeconds -ge $DebounceSeconds) {
                Write-Log "${DebounceSeconds}s elapsed since last change. Deploying..." Yellow
                $pending = $false
                $lastChangeTime = $null
                Invoke-Deploy
                Write-Log 'Resuming watch...' Green
                Write-Host ''
            }
        }
    }
}
finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    Write-Log 'Watcher stopped.' Yellow
}
