@echo off
REM Quick start script for Manager Allocation Approval Dashboard (Windows)

echo Starting Manager Allocation Approval Dashboard...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js v14 or higher.
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Install backend dependencies if needed
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo Backend dependencies installed
    echo.
)

REM Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    echo Frontend dependencies installed
    echo.
)

echo Starting backend server on http://localhost:5000...
start "Backend Server" cmd /k "cd backend && npm start"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

echo Starting frontend server on http://localhost:3000...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Application is running!
echo    Backend:  http://localhost:5000
echo    Frontend: http://localhost:3000
echo.
echo Close the server windows to stop the application.
pause
