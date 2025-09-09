import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import HomePage from "./pages/HomePage";
import BlogPost from "./pages/BlogPost";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyProjects";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/myprojects" element={<MyPosts/>} />
      </Routes>
    </Router>
  );
}

export default App;
