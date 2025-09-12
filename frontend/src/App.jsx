import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPost";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyProjects";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Dashboard";
import SavedPosts from "./pages/SavedPosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/myprojects" element={<MyPosts />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/savedposts" element={<SavedPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
