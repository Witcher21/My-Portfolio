@echo off
TITLE Nawod Portfolio - Starting Server...
COLOR 0B

echo ===================================================
echo      STARTING NAWOD'S PORTFOLIO SERVER 🚀
echo ===================================================
echo.
echo [1/2] Checking files...
if not exist "package.json" (
    echo ERROR: package.json not found! Make sure you are in the correct folder.
    pause
    exit
)

echo [2/3] Opening VS Code...
code .

echo [3/3] Starting Development Server...
echo.
echo Opening browser in 5 seconds...
timeout /t 5 >nul
start http://localhost:3000

echo.
echo Server is running! Press Ctrl+C to stop.
echo.
npm run dev
pause
