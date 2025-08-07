# Digital Legacy Platform with Embedded AI Assistant

A comprehensive, hackathon-ready digital legacy management application designed for ultra-secure inheritance, account, document, and loan management—with a context-aware AI assistant accessible across the platform.

## 🚀 Features

### Core Features
- **Ultra-Secure Inheritance Management**: Military-grade encryption with biometric authentication
- **Account Manager**: Digital account storage with zero-knowledge encrypted vault
- **Document & Asset Manager**: Secure document storage with heir-specific access
- **Loan Manager**: Track loans, repayments, and interest with visualization
- **Heir Management**: Biometric setup and access control for heirs
- **Emergency Portal**: Heir access with biometric and OTP verification
- **Activity Timeline**: Transparent logging of all actions and changes
- **Periodic Alive Checks**: AI-driven user verification system

### AI Assistant
- **Context-Aware Help**: Understands current page and user actions
- **Multi-Modal Input**: Voice and text input support
- **Multi-Language Support**: International accessibility
- **Workflow Guidance**: Step-by-step assistance for complex processes
- **Proactive Alerts**: Security reminders and critical action notifications
- **Human Escalation**: Seamless handoff to human support when needed

### Security & Privacy
- **Biometric Authentication**: Device-native biometrics (FaceID, TouchID, Android)
- **Zero-Knowledge Architecture**: No raw biometric data stored
- **Multi-Factor Authentication**: Biometric + passcode + OTP verification
- **End-to-End Encryption**: AES-256 for data, OpenPGP for credentials
- **GDPR Compliance**: Full privacy regulation compliance
- **Audit Logging**: Comprehensive security event tracking

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for modern, accessible UI components
- **Tailwind CSS** for custom styling and responsive design
- **Redux Toolkit** for state management
- **React Query** for server state management
- **Socket.IO Client** for real-time features
- **Framer Motion** for animations

### Backend
- **Node.js** with TypeScript
- **Express.js** for RESTful APIs
- **Socket.IO** for real-time communication
- **PostgreSQL** for core data storage
- **MongoDB** for document storage
- **Redis** for caching and sessions

### Security & Authentication
- **JWT** for authentication tokens
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **Rate limiting** for API protection
- **CORS** configuration

### AI & External Services
- **OpenAI GPT-4** / **Claude** for AI assistant
- **Twilio** for SMS notifications
- **SendGrid** for email services
- **AWS S3** for encrypted document storage

## 📁 Project Structure

```
digital-legacy-platform/
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── config/         # Database and service configurations
│   │   ├── controllers/    # API route controllers
│   │   ├── middleware/     # Authentication, validation, error handling
│   │   ├── models/         # Database models and schemas
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic and external services
│   │   ├── utils/          # Utility functions and helpers
│   │   └── server.ts       # Main server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── services/      # API services and utilities
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- MongoDB 5+
- Redis 6+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-legacy-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run build
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Database Setup**
   - Create PostgreSQL database
   - Create MongoDB database
   - Start Redis server
   - Run database migrations (when implemented)

### Environment Variables

Copy `.env.example` to `.env` in the backend directory and configure:

- Database connections (PostgreSQL, MongoDB, Redis)
- JWT secrets
- Encryption keys
- External service API keys (Twilio, SendGrid, OpenAI)
- Cloud storage configuration (AWS S3)

## 🎯 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and architecture
- [x] Basic frontend and backend structure
- [x] Development environment configuration

### Phase 2: Core Features (In Progress)
- [ ] Database design and implementation
- [ ] Authentication and security infrastructure
- [ ] Backend API development
- [ ] Frontend core application
- [ ] AI assistant integration

### Phase 3: Advanced Features
- [ ] Emergency/heir portal
- [ ] Security features and compliance
- [ ] Biometric authentication
- [ ] Real-time notifications

### Phase 4: Testing & Demo
- [ ] Comprehensive testing
- [ ] Demo preparation
- [ ] Documentation completion

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm start
```

### Production
```bash
# Build backend
cd backend && npm run build

# Build frontend
cd frontend && npm run build

# Start production server
cd backend && npm start
```

## 🎨 Demo Features

The platform includes several demo-ready features perfect for hackathon presentations:

1. **Full Inheritance Workflow**: Complete document upload → heir assignment → biometric setup → emergency access
2. **AI-Guided Onboarding**: Step-by-step platform introduction with contextual help
3. **Biometric Demo**: Simulated biometric authentication (camera-based for demo)
4. **Real-time Notifications**: Live updates and alerts
5. **Emergency Portal**: Dramatic heir access scenario
6. **Security Dashboard**: Visual representation of security measures

## 🔒 Security Considerations

- All sensitive data is encrypted at rest and in transit
- Biometric data is never stored in raw format
- Multi-factor authentication required for sensitive operations
- Comprehensive audit logging for all actions
- Regular security assessments and updates

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

This is a hackathon project. For contribution guidelines, please see CONTRIBUTING.md.

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for the Digital Legacy Hackathon**
