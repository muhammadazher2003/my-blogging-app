import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleEdit = (post) => {
    localStorage.setItem("post", post);
    navigate("/create-post");
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.error("❌ Failed to fetch user posts:", err);
    }
  };

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/posts/myposts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch user posts:", err);
      }
    };

    fetchMyPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar setSearchQuery={setSearchQuery} />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-10 text-indigo-600 tracking-tight dark:text-blue-500">
          My Blog Posts
        </h1>

        {filteredPosts.length === 0 ? (
          <p className="text-gray-600 text-lg font-medium dark:text-gray-400">
            You haven't written any posts yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl relative transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 dark:border-gray-800"
              >
                <div className="absolute top-4 right-4 flex space-x-3">
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="text-indigo-600 hover:text-indigo-800 dark:text-blue-400 dark:hover:text-blue-600 transition-all duration-200"
                    title="Edit"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 transition-all duration-200"
                    title="Delete"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>

                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 line-clamp-3 dark:text-gray-300">
                  {post.content.slice(0, 200)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MyPosts;
