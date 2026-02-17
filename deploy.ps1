# GitHub Pages 自動デプロイスクリプト (A案: ワンコマンド方式)
# 使い方: .\deploy.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Pages デプロイスクリプト" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 変更されたファイルの確認
Write-Host "[1/4] 変更されたファイルを確認中..." -ForegroundColor Yellow
git status --short

$hasChanges = git status --porcelain
if (-not $hasChanges) {
    Write-Host ""
    Write-Host "✓ 変更がありません。デプロイは不要です。" -ForegroundColor Green
    Write-Host ""
    exit 0
}

Write-Host ""
Write-Host "[2/4] すべての変更をステージング中..." -ForegroundColor Yellow
git add -A

# タイムスタンプ付きコミットメッセージの生成
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMessage = "Update: $timestamp"

Write-Host ""
Write-Host "[3/4] コミットを作成中..." -ForegroundColor Yellow
Write-Host "    メッセージ: $commitMessage" -ForegroundColor Gray
git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "✗ コミットに失敗しました。" -ForegroundColor Red
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "[4/4] リモートにプッシュ中..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ デプロイ完了！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "GitHub Pagesが更新されるまで、数分かかる場合があります。" -ForegroundColor Gray
    Write-Host "公開URL: https://raika620uta.github.io/ca_portfolio/" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "✗ プッシュに失敗しました。" -ForegroundColor Red
    Write-Host "  ネットワーク接続を確認してください。" -ForegroundColor Gray
    Write-Host ""
    exit 1
}
