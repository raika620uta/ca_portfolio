# GitHub Pages 自動デプロイスクリプト (B案: ファイル監視方式)
# 使い方: .\auto-deploy.ps1
# 停止: Ctrl+C

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  自動デプロイ監視を開始します" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "監視対象: カレントディレクトリ" -ForegroundColor Gray
Write-Host "除外: .git/, node_modules/, dist/, build/" -ForegroundColor Gray
Write-Host "待機時間: 変更検知後30秒" -ForegroundColor Gray
Write-Host ""
Write-Host "停止するには Ctrl+C を押してください。" -ForegroundColor Yellow
Write-Host ""

# 監視対象ディレクトリ
$watchPath = Get-Location

# FileSystemWatcherの設定
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $watchPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# 除外パターン
$excludePatterns = @(
    "\.git",
    "node_modules",
    "dist",
    "build",
    "\.log$",
    "~$"
)

# 最後のデプロイ時刻
$script:lastDeployTime = [DateTime]::MinValue
$script:pendingChanges = $false
$script:timer = $null

# 変更を検知したときの処理
$onChange = {
    param($source, $e)
    
    # 除外パターンに一致するか確認
    $relativePath = $e.FullPath.Replace($watchPath.Path, "").TrimStart("\")
    $shouldExclude = $false
    
    foreach ($pattern in $excludePatterns) {
        if ($relativePath -match $pattern) {
            $shouldExclude = $true
            break
        }
    }
    
    if ($shouldExclude) {
        return
    }
    
    # 変更を検知
    $changeType = $e.ChangeType
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 変更検知: $relativePath ($changeType)" -ForegroundColor Cyan
    
    # 30秒のタイマーをリセット
    if ($script:timer) {
        $script:timer.Stop()
        $script:timer.Dispose()
    }
    
    $script:pendingChanges = $true
    
    $script:timer = New-Object System.Timers.Timer
    $script:timer.Interval = 30000  # 30秒
    $script:timer.AutoReset = $false
    
    Register-ObjectEvent -InputObject $script:timer -EventName Elapsed -Action {
        # デプロイ実行
        Write-Host ""
        Write-Host "----------------------------------------" -ForegroundColor Yellow
        Write-Host "  自動デプロイを開始します..." -ForegroundColor Yellow
        Write-Host "----------------------------------------" -ForegroundColor Yellow
        
        # 変更確認
        $hasChanges = git status --porcelain
        if (-not $hasChanges) {
            Write-Host "変更がありません。スキップします。" -ForegroundColor Gray
            Write-Host ""
            return
        }
        
        # デプロイ実行
        git add -A
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        $commitMessage = "Auto-update: $timestamp"
        
        Write-Host "コミット: $commitMessage" -ForegroundColor Gray
        git commit -m $commitMessage | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "プッシュ中..." -ForegroundColor Gray
            git push origin main | Out-Null
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ デプロイ完了！" -ForegroundColor Green
                $script:lastDeployTime = Get-Date
            } else {
                Write-Host "✗ プッシュに失敗しました。" -ForegroundColor Red
            }
        } else {
            Write-Host "✗ コミットに失敗しました。" -ForegroundColor Red
        }
        
        Write-Host ""
        $script:pendingChanges = $false
    } | Out-Null
    
    $script:timer.Start()
}

# イベント登録
Register-ObjectEvent -InputObject $watcher -EventName Changed -Action $onChange | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName Created -Action $onChange | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName Deleted -Action $onChange | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName Renamed -Action $onChange | Out-Null

Write-Host "✓ 監視を開始しました。" -ForegroundColor Green
Write-Host ""

# 無限ループで待機
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    # クリーンアップ
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    if ($script:timer) {
        $script:timer.Dispose()
    }
    Get-EventSubscriber | Unregister-Event
    Write-Host ""
    Write-Host "監視を停止しました。" -ForegroundColor Yellow
    Write-Host ""
}
