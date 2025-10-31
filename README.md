# 🖼️ Image Search Web App  
>A full-stack image search web app built with the MERN stack. Features OAuth login via Google, GitHub, and Facebook, personalized search history, global top searches, and Unsplash API integration for fetching high-quality images.

![React](https://img.shields.io/badge/Frontend-React_19.1.0-61dafb?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-43853d?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)
![Passport.js](https://img.shields.io/badge/Auth-Passport.js-34D058?logo=passport&logoColor=white)

---

## 🚀 Overview

**ImageSearch** is a full-stack image discovery web app where users can:
- Search for **high-quality images** using the **Unsplash API**  
- **Sign in securely** via Google, GitHub, or Facebook OAuth  
- Maintain **personalized search history**  
- View **top global searches** across all users  

This project demonstrates **real-world full-stack development** integrating APIs, authentication, and a dynamic frontend using **React + Tailwind CSS**.

---

## ✨ Features

### 🔐 Authentication
- OAuth login using:
  - 🔸 Google  
  - 🔸 GitHub  
  - 🔸 Facebook  
- Managed with **Passport.js** and secure **cookie-based sessions**

### 🔍 Image Search
- Search for any keyword and fetch images using the **Unsplash API**
- Responsive image grid layout with preview
- Displays random images when no query entered

### 🕓 Search History
- Displays **last 5 searches** of each user  
- Click to re-search instantly  
- Option to delete any entry

### 🔥 Top Searches
- Shows top **3 most frequently searched terms globally**  
- Automatically updates as users perform searches  
- Clean layout with `#1`, `#2`, `#3` badges

### 💎 User Interface
- Built using **React 19.1.0** and **TailwindCSS**
- Modern layout with gradient backgrounds, rounded cards, and smooth animations
- Includes a floating **scroll-to-top** button

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React 19.1.0, Tailwind CSS, React Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | Passport.js (Google, GitHub, Facebook OAuth) |
| **API** | Unsplash API |
| **Session Handling** | cookie-session |
| **Environment Management** | dotenv |

---

## 🧠 Architecture Flow


- Users authenticate via OAuth providers  
- Session cookies maintain login state  
- Search terms stored per user  
- Aggregation in MongoDB calculates top global searches  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Menaka0411/mern-image-search-app.git
cd mern-image-search-app
```
### 2️⃣ Install Dependencies

## Backend
```bash
cd server
npm install
```
## Frontend
```bash
cd ../client
npm install
```
### 3️⃣ Configure Environment Variables
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/image-search
SESSION_SECRET=your_secret_key
```
## Unsplash
```bash
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```
## Google OAuth
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```
## GitHub OAuth
```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
```
## Facebook OAuth
```bash
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
FACEBOOK_CALLBACK_URL=http://localhost:5000/auth/facebook/callback
```
```bash
FRONTEND_URL=http://localhost:5173
```
### 4️⃣ Run the Application

## Start Backend
```bash
cd server
npm run dev
```
## Start Frontend
```bash
cd client
npm run dev
```
## 🖼️ App Screenshots

<div align="center">

<img src="result/img1.png" alt="Login Page 1" width="22%" style="margin:10px;">
<img src="result/img2.png" alt="Login Page 2" width="22%" style="margin:10px;">
<img src="result/img6.png" alt="Login Page 3" width="22%" style="margin:10px;">
<img src="result/img7.png" alt="Login Page 4" width="22%" style="margin:10px;">

<br>

<img src="result/img3.png" alt="Dashboard 1" width="25%" style="margin:10px;">
<img src="result/img4.png" alt="Dashboard 2" width="25%" style="margin:10px;">
<img src="result/img5.png" alt="Dashboard 3" width="25%" style="margin:10px;">

</div>
