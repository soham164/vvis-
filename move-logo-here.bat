@echo off
echo ========================================
echo   LOGO MOVER - School Website
echo ========================================
echo.
echo This script will help you move your logo to the correct location.
echo.
echo Please drag and drop your logo file here and press Enter...
echo (Or type the full path to your logo file)
echo.
set /p logopath="Logo file path: "

if "%logopath%"=="" (
    echo Error: No file path provided!
    pause
    exit
)

rem Remove quotes if present
set logopath=%logopath:"=%

if not exist "%logopath%" (
    echo Error: File not found!
    echo Path: %logopath%
    pause
    exit
)

rem Get file extension
for %%i in ("%logopath%") do set ext=%%~xi

echo.
echo Copying logo to public folder...
copy "%logopath%" "public\logo%ext%"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Logo copied successfully!
    echo ========================================
    echo.
    echo Location: public\logo%ext%
    echo.
    
    if /i not "%ext%"==".png" (
        echo NOTE: Your logo is %ext% format.
        echo For best results, use PNG format with transparent background.
        echo.
        echo The code expects: logo.png
        echo Your file is: logo%ext%
        echo.
        echo You may need to:
        echo 1. Rename logo%ext% to logo.png, OR
        echo 2. Update the code to use logo%ext%
        echo.
    )
    
    echo Next steps:
    echo 1. Go to http://localhost:3000
    echo 2. Press Ctrl + Shift + R to refresh
    echo 3. Your logo should now appear in top-left!
    echo.
) else (
    echo.
    echo Error: Failed to copy logo!
    echo Please try copying manually.
    echo.
)

pause
