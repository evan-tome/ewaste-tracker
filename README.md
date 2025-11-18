<<<<<<< HEAD
# ♻️ E-Waste Tracker

A full-stack web application developed for **SOFE 3700U – Data Management Systems (Fall 2025)**.  
This project promotes sustainable electronic waste (e-waste) recycling by connecting users with recycling centres, tracking their environmental impact, and offering reward incentives for responsible disposal.

---

## 📁 Project Structure
```bash
backend/
├── config/              # MySQL connection + environment setup
├── src/
│   ├── routes/          # API endpoints
│   ├── controllers/     # Logic for each route
│   ├── models/          # SQL query modules
│   ├── middleware/      # Auth & validation logic
│   ├── services/        # External API integrations
│   └── utils/           # Helper functions
├── db/
│   ├── schema.sql       # Database schema
│   ├── views.sql        # Database views
├── .env                 # Environment variables
├── package.json         # Node.js dependencies & scripts
└── server.js            # App entry point
```

## ⚙️ Backend Setup

### Prerequisites
- Node.js ≥ 18  
- MySQL ≥ 8.0  
- Git

### 1. Clone the repository
```bash
git clone https://github.com/evan-tome/ewaste-tracker.git
cd ewaste-tracker/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create a file .env inside the backend directory:
```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=ewaste_tracker
SESSION_SECRET=your_secret
GOOGLE_MAPS_API_KEY=your_key
```
Replace SESSION_SECRET with a secure, randomly generated string.

Generate a Google Places API key and replace GOOGLE_MAPS_API_KEY with your key.
https://console.cloud.google.com/

### 4. Set up the database

Open MySQL CLI or Workbench.

Run the SQL file to create schema and tables:
```bash
mysql -u root -p < db/db.sql
```
Run the SQL file to create views:
```bash
mysql -u root -p < db/views.sql
```

### 5. Start the server
```bash
npm run dev
```
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 9985582 (Initial React project upload)
