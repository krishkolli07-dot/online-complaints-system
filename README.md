# Online Complaints Registration and Management System

A full-stack MERN application that allows users to register complaints, track complaint status, and communicate with administrators through a centralized complaint management platform.

## 🚀 Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Submit complaints
- Select complaint category
- Set complaint priority
- Track complaint status
- Search complaints
- Filter complaints by status
- View administrator responses
- Delete own complaints
- Responsive user dashboard

### 🛡️ Admin Features

- Secure admin authentication
- View all complaints
- Search complaints
- Filter complaints by status
- View user details
- Update complaint status
- Change complaint priority
- Add administrator responses
- Delete complaints
- View complaint statistics

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- REST API

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Development Tools

- VS Code
- Git
- GitHub
- Postman

## 📂 Project Structure

```text
online-complaints-system/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
