@echo off
echo === HukukAI GitHub Push ===
echo.
echo 1. GitHub'da yeni repo olusturun: https://github.com/new
echo    Repository name: hukukai
echo.
echo 2. GitHub kullanici adinizi girin:
set /p GITHUB_USER=
if "%GITHUB_USER%"=="" (
  echo Hata: Kullanici adi gerekli.
  pause
  exit /b 1
)
echo.
echo Repo ekleniyor ve push yapiliyor...
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/%GITHUB_USER%/hukukai.git 2>nul
"C:\Program Files\Git\bin\git.exe" push -u origin main
echo.
pause
