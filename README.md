# 🩺 Doctor Appointment Booking System

A full-stack MERN (MongoDB, Express, React, Node.js) based web application to help patients find doctors, book appointments, and manage their bookings online.

---

## 🔥 Features

### 👤 Authentication & Authorization
- Register as Patient or Doctor
- Login with secure JWT-based authentication
- Protected & Private Routes
- Role-based access control (Patient / Doctor / Admin)

### 🩺 Doctor Module
- Create and manage doctor profile
- Upload profile picture via Cloudinary
- Add specialization, experience, timing, fees
- Doctors can view, approve, or reject appointments

### 👨‍⚕️ Patient Module
- Search doctors by specialization
- View doctor profiles
- Book appointments with available time/date
- View appointment history

### 🧾 Appointment Management
- Create new appointments
- Doctor approves or rejects requests
- Appointment status (pending, approved, rejected)
- Connected with both Patient and Doctor

### 📷 Cloudinary Integration
- Upload profile picture during doctor registration
- Secure and scalable image hosting

### 💻 Responsive Frontend (React + Tailwind CSS)
- Modern UI/UX
- Mobile responsive layout
- Sidebar drawer for mobile navigation

### 🔐 Secure Backend (Node.js + Express)
- RESTful APIs
- Middleware-based token verification
- Error handling & validation

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (Access & Refresh tokens)
- **Image Upload:** Cloudinary + Multer
- **Other Tools:** Lucide-react icons, dotenv, cookie-parser

---

## 🗂️ Folder Structure (Simplified)

