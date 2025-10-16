#!/bin/bash

# Quick start script for Manager Allocation Approval Dashboard

echo "🚀 Starting Manager Allocation Approval Dashboard..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo ""

# Install backend dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    echo "✓ Backend dependencies installed"
    echo ""
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    echo "✓ Frontend dependencies installed"
    echo ""
fi

echo "🔧 Starting backend server on http://localhost:5000..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

echo "🎨 Starting frontend server on http://localhost:3000..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Application is running!"
echo "   Backend:  http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
