# 📝 Task Manager Frontend

This is the frontend of the Task Manager full-stack application built using React.  
It allows users to manage daily tasks efficiently with a clean and responsive UI.

## 🚀 Live Demo
Deployed on Vercel:
👉 [https://your-vercel-link.vercel.app](https://taskmanagerfrontend-sigma.vercel.app/)

---

## 🛠 Tech Stack

- React.js
- JavaScript (ES6+)
- CSS / Tailwind (if used)
- Axios (for API calls)
- Vercel (Deployment)

---

## ✨ Features

- Create new tasks
- Update existing tasks
- Delete tasks
- View all tasks
- API integration with Spring Boot backend
- Responsive design

---

## 📂 Project Structure

```bash
task-manager-frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.js
│   ├── main.jsx
│   └── styles.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

- **components/** → Reusable UI components
- **pages/** → Application pages
- **services/** → API integration logic
- **App.js** → Main application component
- **main.jsx / index.js** → Entry point of React app
