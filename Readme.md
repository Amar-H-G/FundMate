<p align="center">
  <img src="frontend/public/images.png" alt="FundMate Logo" width="120" />
</p>

<h1 align="center">
  <span style="color:#4f46e5;">FundMate</span> 🚀
</h1>
<p align="center">
  <b>Your trusted partner for mutual fund investment tracking and analytics.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-18-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-4.18-black?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-6.0-brightgreen?logo=mongodb" />
  <img src="https://img.shields.io/badge/Vite-4.0-purple?logo=vite" />
</p>

---

## 🌟 Features

- 🎨 **Modern UI**: Responsive, animated, and beautiful interface with Tailwind CSS and Framer Motion.
- 🔒 **Authentication**: Secure login, registration, and protected routes.
- 📈 **Fund Analytics**: Search, view, and analyze mutual funds with real-time data and performance charts.
- 💾 **Save Funds**: Save your favorite funds and manage your personalized list.
- 👤 **Profile Management**: View and edit your profile, see account stats, and upgrade to premium.
- 📊 **Dashboard**: Personalized dashboard with recommended and saved funds.
- ☁️ **Persistent Auth**: Authentication state is preserved across refreshes using localStorage.
- 🌙 **Dark Mode Ready**: Easily extendable for dark mode.

---

## 🏗️ Project Structure

```
FundMate/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routers/
│   ├── config/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── Pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. **Clone the repository**

```bash
git clone https://github.com/Amar-H-G/FundMate.git
cd FundMate
```

### 2. **Setup Backend**

```bash
cd backend
npm install
# Create a .env file (see .env.example)
npm start
```

### 3. **Setup Frontend**

```bash
cd ../frontend
npm install
# Create a .env file (see .env.example)
npm run dev
```

### 4. **Open in Browser**

Visit: [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Environment Variables

- **Backend**:  
  - `MONGO_URI` - MongoDB connection string  
  - `JWT_SECRET` - Secret for JWT  
  - `PORT` - Server port

- **Frontend**:  
  - `VITE_FUNDMATE_BACKEND_URI` - Backend API base URL

---

## 🛡️ Authentication & State Persistence

- Auth state is managed via React Context and **persisted in `localStorage`**.
- On refresh, the app restores your session automatically.
- Protected routes wait for auth state to load before redirecting.
- **If you are redirected to `/signin` on refresh, make sure your `AuthContext` and `ProtectedRoute` are implemented as described in the codebase.**

---

## 🖥️ Tech Stack

| Frontend         | Backend         | Database   |
|------------------|----------------|------------|
| React 18         | Node.js 18     | MongoDB    |
| Vite             | Express.js     |            |
| Tailwind CSS     | JWT Auth       |            |
| Framer Motion    |                |            |
| Axios            |                |            |

---

## 📂 Notable Files & Folders

- `frontend/src/Components/` - All React UI components
- `frontend/src/Context/AuthContext.jsx` - Auth logic and persistence
- `frontend/src/Components/ProtectedRoute.jsx` - Route protection
- `backend/controllers/` - Express controllers
- `backend/models/` - Mongoose models

---

## 📝 Scripts

| Command           | Description                |
|-------------------|---------------------------|
| `npm run dev`     | Start frontend (Vite)     |
| `npm start`       | Start backend (Node.js)   |

---

## 🎨 Screenshots

<p align="center">
  <img src="frontend/public/screenshot1.png" width="350" style="border-radius:8px;margin:8px;" />
  <img src="frontend/public/screenshot2.png" width="350" style="border-radius:8px;margin:8px;" />
</p>

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">
  <b><span style="color:#4f46e5;">FundMate</span> — Invest smart, track smarter!</b>
</p>
