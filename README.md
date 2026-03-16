# College-Bawa
🚀 **College-Bawa** is a comprehensive MERN stack social platform designed specifically for college students to connect, collaborate, share resources, and build communities. It combines social networking, real-time messaging, marketplace functionality, and event management in one unified platform.

## 📋 Table of Contents
- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)

## 🎯 About the Project
College-Bawa is a full-featured social platform built for college students featuring:
- **Social Networking**: Posts, likes, comments, and user profiles
- **Real-time Communication**: One-on-one and group messaging with Socket.io
- **Marketplace**: Buy/sell books, projects, and gadgets
- **Community Building**: Study groups, event sharing, and collaboration
- **Admin Dashboard**: Analytics and user management
- **Anonymous Posting**: Share thoughts without identity

## 🔥 Key Features

### 🔐 Authentication & User Management
- JWT-based authentication with email/password
- Google OAuth 2.0 integration
- Password reset via email
- User profile management with additional details
- User search and discovery

### 📱 Social Feed & Posts
- Create posts with text and images
- Like, comment, and share functionality
- Anonymous posting feature
- Image upload to Cloudinary CDN

### 💬 Real-time Messaging & Chat
- One-on-one and group chat support
- Real-time message delivery with Socket.io
- Typing indicators and read receipts
- Online status tracking
- Message attachments support

### 🛒 Marketplace
- Post items for sale (books, projects, gadgets)
- Up to 5 images per listing
- Item categories and status tracking
- Location-based listings

### 🔔 Notifications
- Real-time notifications for messages, mentions, and events
- Multiple notification types
- Mark as read functionality

### 📊 Admin Dashboard
- User statistics and analytics
- College/branch distribution charts
- User management capabilities
- Signup trends and authentication method analysis

### 🔍 Search & Discovery
- Global user search
- Community and event discovery
- Advanced filtering options

## 🛠 Tech Stack

### Backend
| Component | Technology | Version |
|-----------|------------|---------|
| **Runtime** | Node.js | - |
| **Framework** | Express.js | ^4.21.2 |
| **Database** | MongoDB Atlas | - |
| **ODM** | Mongoose | ^8.12.1 |
| **Authentication** | JWT, Passport.js | ^9.0.2, ^0.7.0 |
| **Real-time** | Socket.io | ^4.8.1 |
| **File Upload** | Multer, Cloudinary | ^2.0.2, ^2.6.0 |
| **Email** | Nodemailer | ^6.10.0 |

### Frontend
| Component | Technology | Version |
|-----------|------------|---------|
| **Framework** | React | ^19.0.0 |
| **Build Tool** | Vite | ^7.3.1 |
| **Routing** | React Router DOM | ^7.2.0 |
| **Styling** | Tailwind CSS | ^4.2.1 |
| **HTTP Client** | Axios | ^1.8.1 |
| **Real-time** | Socket.io Client | ^4.8.1 |
| **UI Icons** | Lucide React, React Icons | ^0.544.0, ^5.5.0 |
| **Charts** | Chart.js, React-Chartjs-2 | ^4.4.8, ^5.3.0 |

## 🏗 System Architecture

### High-Level Architecture
```
┌─────────────────┐    HTTP/WebSocket    ┌─────────────────┐
│   React Frontend│◄──────────────────►│ Express Backend │
│   (Vite)        │                     │   (Node.js)     │
└─────────────────┘                     └─────────────────┘
         │                                       │
         │                                       │
         ▼                                       ▼
┌─────────────────┐                     ┌─────────────────┐
│  Context API    │                     │   MongoDB       │
│  State Mgmt     │                     │   Atlas         │
└─────────────────┘                     └─────────────────┘
                                                 │
                    ┌────────────────────────────┼────────────────────────────┐
                    │                            │                            │
            ┌──────────────┐            ┌──────────────┐            ┌──────────────┐
            │  Cloudinary  │            │  Nodemailer  │            │   Socket.io   │
            │  (Images)    │            │   (Email)    │            │ (Real-time)  │
            └──────────────┘            └──────────────┘            └──────────────┘
```

### Database Schema Overview
- **Users**: Authentication, profiles, additional details
- **Posts**: Social feed content, interactions (likes/comments)
- **Chats**: Conversation management (direct/group)
- **Messages**: Chat messages with attachments
- **Notifications**: User notifications and alerts
- **MarketplaceItems**: Buy/sell listings
- **Colleges**: Institution data

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth
- `POST /api/auth/forget-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Social Feed Endpoints
- `POST /api/posts` - Create post
- `GET /api/posts` - Get all posts
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Comment on post
- `DELETE /api/posts/:id` - Delete post

### Chat & Messaging
- `POST /api/chats` - Create/access chat
- `GET /api/chats` - Get user chats
- `POST /api/messages` - Send message
- `GET /api/messages/:chatId` - Get chat messages

### Marketplace
- `GET /api/marketplace` - Get marketplace items
- `POST /api/marketplace/postItem` - Post item for sale

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `DELETE /api/admin/users/:id` - Delete user

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Google OAuth credentials
- Cloudinary account
- Email service (Gmail/SMTP)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd College-Bawa
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

## ⚙️ Environment Setup

### Backend Environment Variables (.env)
```env
# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/CollegeBawa?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret

# OAuth
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret

# File Upload
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service
EMAIL_USER=sender@gmail.com
EMAIL_PASSWORD=app_specific_password

# Server
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables (.env)
```env
VITE_APP_BACKEND_URL=http://localhost:5000
VITE_APP_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
```

## ▶️ Running the Application

### Development Mode

1. **Start Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server runs on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Production Build

1. **Build Frontend**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Start Production Backend**
   ```bash
   cd Backend
   npm start
   ```

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend Deployment (Render/Railway)
1. Connect repository to hosting platform
2. Set environment variables
3. Configure build/start commands
4. Deploy and get production URL

## 🔒 Security

### Implemented Security Measures
- JWT token authentication with expiration
- Password hashing using bcryptjs
- CORS configuration
- Input validation
- Protected API routes
- Session management

### Security Best Practices
- Use HTTPS in production
- Regularly update dependencies
- Implement rate limiting
- Validate all user inputs
- Use environment variables for secrets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for college students, by college students**
We welcome contributions! Follow these steps:

Fork the repo and create a new branch.
Make your changes and commit with a meaningful message.
Push to your fork and create a pull request (PR).
📝 License
This project is licensed under the MIT License. See the LICENSE file for details.

📢 Want Any Changes?
Let me know if you want any modifications! 🚀








