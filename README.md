# 🏦 Banking Ledger Project

A Full Stack Banking Ledger System built using **React.js**, **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

This project demonstrates secure user authentication, bank account creation, ledger-based balance calculation, protected REST APIs, and a modern responsive frontend dashboard.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- User Logout
- Password Hashing using bcrypt

### 🏦 Bank Account
- Create Bank Account
- View User Accounts
- Check Account Balance
- Multiple Account Support

### 💰 Ledger & Transactions
- Ledger-based balance calculation
- Credit Entries
- Debit Entries
- Transaction History
- Initial Fund Support
- Idempotency Key Validation
- MongoDB Transaction Sessions

### 📧 Email Services
- Registration Email
- Transaction Notification Email

### 🎨 Frontend
- Modern Banking Dashboard
- Responsive UI
- Login & Registration
- Account Management
- Balance Overview
- JWT Token Handling
- Axios API Integration

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- Nodemailer

## Database
- MongoDB Atlas

## Version Control
- Git
- GitHub

---

# 📂 Project Structure

```
Banking-Ledger-Project
│
├── backend-ledger-main
│   ├── src
│   │
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── config
│   │
│   ├── server.js
│   └── package.json
│
├── banking-frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/priyanshubhaskar2103/Banking-Ledger-Project.git
```

Move inside the project

```bash
cd Banking-Ledger-Project
```

---

# Backend Setup

```bash
cd backend-ledger-main

npm install

npm start
```

Backend runs on

```
http://localhost:3000
```

---

# Frontend Setup

Open another terminal

```bash
cd banking-frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Environment Variables

Backend `.env`

```env
PORT=3000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

EMAIL_USER=YOUR_EMAIL

EMAIL_PASS=YOUR_EMAIL_PASSWORD
```

Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

# REST API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/logout |

---

## Accounts

| Method | Endpoint |
|---------|----------|
| POST | /api/accounts |
| GET | /api/accounts |
| GET | /api/accounts/balance/:accountId |

---

## Transactions

| Method | Endpoint |
|---------|----------|
| POST | /api/transactions |
| POST | /api/transactions/system/initial-funds |

---

# Authentication Flow

```
Register
      │
      ▼
Login
      │
      ▼
JWT Token Generated
      │
      ▼
Protected APIs
      │
      ▼
Create Account
      │
      ▼
Ledger Entries
      │
      ▼
Balance Calculation
```

---

# Database Collections

- users
- accounts
- transactions
- ledgers
- blacklists

---

# Security Features

✅ JWT Authentication

✅ Password Hashing

✅ Protected Routes

✅ Token Blacklisting

✅ Cookie Support

✅ Idempotency Keys

✅ MongoDB Transactions

---

# Future Improvements

- Money Transfer UI
- Transaction History Page
- Admin Dashboard
- Profile Management
- Password Reset
- Email Verification
- Account Statements (PDF)
- Dark / Light Theme
- Docker Deployment
- AWS Deployment

---

# Screenshots

## Login Page

_Add screenshot here_

---

## Dashboard

_Add screenshot here_

---

## Account Page

_Add screenshot here_

---

## MongoDB Collections

_Add screenshot here_

---

# Author

**Priyanshu Bhaskar**

B.Tech Computer Science Engineering

Sharda University

GitHub:
https://github.com/priyanshubhaskar2103

---

# License

This project is created for educational and internship purposes.
