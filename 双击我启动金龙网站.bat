@echo off
title Kim Long Website Starter
color 0A

echo ==========================================================
echo               Kim Long Website Starter
echo ==========================================================
echo.

:: Change directory to current folder
cd /d "%~dp0"

:: Check if package.json exists
if not exist "package.json" goto NO_PACKAGE

set NPM_CMD=

:: 1. Try system environment npm
where npm >nul 2>nul
if %errorlevel% equ 0 set NPM_CMD=npm
if not "%NPM_CMD%"=="" goto START_SERVICE

:: 2. Try default installation paths
if exist "C:\Program Files\nodejs\npm.cmd" set NPM_CMD="C:\Program Files\nodejs\npm.cmd"
if not "%NPM_CMD%"=="" goto START_SERVICE

if exist "C:\Program Files (x86)\nodejs\npm.cmd" set NPM_CMD="C:\Program Files (x86)\nodejs\npm.cmd"
if not "%NPM_CMD%"=="" goto START_SERVICE

if exist "%APPDATA%\npm\npm.cmd" set NPM_CMD="%APPDATA%\npm\npm.cmd"
if not "%NPM_CMD%"=="" goto START_SERVICE

:: If npm not found, show error
if "%NPM_CMD%"=="" goto NO_NPM

:START_SERVICE
echo [INFO] Starting local server with %NPM_CMD% ...
echo [INFO] Auto-opening http://localhost:3000 in 4 seconds...
echo [INFO] Please do NOT close this window while browsing the website.
echo.

:: Auto open browser in 4 seconds
start "" cmd /c "timeout /t 4 >nul && start http://localhost:3000"

:: Run Next.js server
call %NPM_CMD% run dev
goto END

:NO_PACKAGE
echo [ERROR] package.json not found!
echo Please make sure this script is in the website root directory.
pause
exit /b 1

:NO_NPM
echo ==========================================================
echo [ERROR] Node.js or npm was NOT found on your computer!
echo ==========================================================
echo Please install Node.js to preview the website locally:
echo.
echo 1. Open Node.js official website: https://nodejs.org/
echo 2. Download and install the "LTS" (Recommended) version.
echo 3. Click "Next" all the way through the installation.
echo 4. After installing, double-click this script again.
echo ==========================================================
pause
exit /b 1

:END
echo.
echo [INFO] Server stopped.
pause
