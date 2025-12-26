@echo off
echo ========================================
echo   VIDEO MOVER - School Website
echo ========================================
echo.
echo This script will help you move your video to the correct location.
echo.
echo Please drag and drop your video file here and press Enter...
echo (Or type the full path to your video file)
echo.
set /p videopath="Video file path: "

if "%videopath%"=="" (
    echo Error: No file path provided!
    pause
    exit
)

rem Remove quotes if present
set videopath=%videopath:"=%

if not exist "%videopath%" (
    echo Error: File not found!
    echo Path: %videopath%
    pause
    exit
)

echo.
echo Copying video to public folder...
copy "%videopath%" "public\hero-video.mp4"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Video copied successfully!
    echo ========================================
    echo.
    echo Location: public\hero-video.mp4
    echo.
    echo Next steps:
    echo 1. Go to http://localhost:3000
    echo 2. Press Ctrl + Shift + R to refresh
    echo 3. Your video should now be playing!
    echo.
) else (
    echo.
    echo Error: Failed to copy video!
    echo Please try copying manually.
    echo.
)

pause
