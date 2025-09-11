# Ubit Backend API

A comprehensive backend API for the Ubit education platform built with Node.js, Express, TypeScript, and MongoDB.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 🏫 **University Management** - CRUD operations for universities, scholarships, and dormitories
- 📝 **Exam Management** - Manage various standardized tests (IELTS, TOEFL, SAT, etc.)
- 📦 **Package Management** - Educational packages and services
- 🛡️ **Security** - Rate limiting, CORS, helmet, input validation
- 📧 **Email Service** - Automated email notifications and templates
- 📊 **Logging** - Comprehensive logging system
- 🔍 **Search & Filtering** - Advanced search capabilities
- 📄 **API Documentation** - Well-documented RESTful endpoints

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: Joi + Express Validator
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── server.ts        # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB 4.4 or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ubit/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ubit

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout user

### Universities

- `GET /api/universities` - Get all universities
- `GET /api/universities/:id` - Get single university
- `POST /api/universities` - Create university (Admin)
- `PUT /api/universities/:id` - Update university (Admin)
- `DELETE /api/universities/:id` - Delete university (Admin)
- `GET /api/universities/search` - Search universities

### Exams

- `GET /api/exams` - Get all exams
- `GET /api/exams/:id` - Get single exam
- `POST /api/exams` - Create exam (Admin)
- `PUT /api/exams/:id` - Update exam (Admin)
- `DELETE /api/exams/:id` - Delete exam (Admin)
- `GET /api/exams/types` - Get exam types

### Packages

- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get single package
- `POST /api/packages` - Create package (Admin)
- `PUT /api/packages/:id` - Update package (Admin)
- `DELETE /api/packages/:id` - Delete package (Admin)
- `GET /api/packages/featured` - Get featured packages

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Development

### Code Style

This project uses ESLint for code linting and follows TypeScript best practices:

- Use TypeScript for all new code
- Follow the existing folder structure
- Add proper error handling
- Include JSDoc comments for functions
- Use async/await over callbacks

### Database Models

The application uses Mongoose ODM with the following main models:

- **User** - User accounts and profiles
- **University** - University information and details
- **Scholarship** - Scholarship opportunities
- **Exam** - Standardized tests and exams
- **Package** - Educational packages and services

### Middleware

Custom middleware includes:

- **Authentication** - JWT token verification
- **Authorization** - Role-based access control
- **Validation** - Request validation using Joi
- **Error Handling** - Centralized error handling
- **File Upload** - Multer configuration for file uploads

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
