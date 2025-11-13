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
SESSION_SECRET=replace_with_a_secret
```

### 4. Set up the database

Open MySQL CLI or Workbench.

Run the schema file to create tables:
```bash
mysql -u root -p < schema/db.sql
```

### 5. Start the server
```bash
npm run dev
```
