#!/bin/bash

# Digital Legacy Platform Setup Script
echo "🚀 Setting up Digital Legacy Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if version is 18 or higher
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$MAJOR_VERSION" -lt 18 ]; then
            print_warning "Node.js version 18+ is recommended. Current version: $NODE_VERSION"
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
}

# Install backend dependencies
setup_backend() {
    print_status "Setting up backend..."
    cd backend
    
    if [ ! -f "package.json" ]; then
        print_error "Backend package.json not found!"
        exit 1
    fi
    
    print_status "Installing backend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed successfully"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
    
    # Copy environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_success "Created .env file from .env.example"
            print_warning "Please edit .env file with your configuration before running the server"
        else
            print_warning ".env.example file not found"
        fi
    else
        print_status ".env file already exists"
    fi
    
    # Create logs directory
    mkdir -p logs
    print_success "Created logs directory"
    
    cd ..
}

# Install frontend dependencies
setup_frontend() {
    print_status "Setting up frontend..."
    cd frontend
    
    if [ ! -f "package.json" ]; then
        print_error "Frontend package.json not found!"
        exit 1
    fi
    
    print_status "Installing frontend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed successfully"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    cd ..
}

# Create development scripts
create_dev_scripts() {
    print_status "Creating development scripts..."
    
    # Create start script
    cat > start-dev.sh << 'EOF'
#!/bin/bash

# Start both frontend and backend in development mode
echo "🚀 Starting Digital Legacy Platform in development mode..."

# Function to kill background processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start backend
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "✅ Servers started!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop both servers"

# Wait for background processes
wait
EOF

    chmod +x start-dev.sh
    print_success "Created start-dev.sh script"
    
    # Create build script
    cat > build.sh << 'EOF'
#!/bin/bash

echo "🏗️ Building Digital Legacy Platform for production..."

# Build backend
echo "Building backend..."
cd backend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Backend built successfully"
else
    echo "❌ Backend build failed"
    exit 1
fi
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo "🎉 Build completed successfully!"
EOF

    chmod +x build.sh
    print_success "Created build.sh script"
}

# Main setup function
main() {
    print_status "Digital Legacy Platform Setup"
    print_status "=============================="
    
    # Check prerequisites
    check_node
    check_npm
    
    # Setup backend
    setup_backend
    
    # Setup frontend
    setup_frontend
    
    # Create development scripts
    create_dev_scripts
    
    print_success "Setup completed successfully! 🎉"
    echo ""
    print_status "Next steps:"
    echo "1. Configure your .env file in the backend directory"
    echo "2. Set up your databases (PostgreSQL, MongoDB, Redis)"
    echo "3. Run './start-dev.sh' to start the development servers"
    echo ""
    print_status "Development servers will be available at:"
    echo "- Frontend: http://localhost:3000"
    echo "- Backend API: http://localhost:5000"
    echo ""
    print_warning "Don't forget to configure your environment variables!"
}

# Run main function
main
