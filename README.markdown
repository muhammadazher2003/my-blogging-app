# My Blogging App

A full-stack MERN blogging platform where users can create, edit, delete, and browse blog posts. Built with React (frontend) and Node.js + Express + MongoDB (backend).

## 🚀 Features

- 🔐 User authentication with JWT
- ✍️ Create, edit, and delete blog posts
- 🖼️ Upload post images
- 🔎 Search posts by tags
- 📄 Pagination support
- ❤️ Like and Unlike posts (real-time update)
- 💬 Add and view comments (with rounded chat-style UI)
- 🎨 Responsive UI with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## 📂 Project Structure
```
my-blogging-app/
├── backend/       # Express API
├── frontend/      # React app
├── README.md
```

## 📸 Screenshots
### 🏠 Homepage
![Homepage](./screenshots/homepage.png)

### 📖 Blog Post Page
![Blog Post Page](./screenshots/blog-post.png)

### 💬 Comments Section
![Comments Section](./screenshots/comments.png)

*Note*: Replace the placeholders (`./screenshots/...`) with actual screenshots by creating a `screenshots` folder in the project root and adding PNG/JPG files.

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/muhammadazher2003/my-blogging-app.git
   cd my-blogging-app
   ```

2. **Backend setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file inside `backend/` with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

   Run backend:
   ```bash
   npm run dev
   ```

3. **Frontend setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

   Your frontend will be running on `http://localhost:5173` and backend on `http://localhost:5000`.

## 🤝 Contributing

Contributions are welcome! Please fork this repo and submit a pull request.

## 📜 License

This project is licensed under the MIT License.