@echo off
echo Starting auto-deploy watcher...
powershell -ExecutionPolicy Bypass -File "%~dp0auto-deploy.ps1"
pause
