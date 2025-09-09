import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const MyPosts = () => {
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
        const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
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
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar setSearchQuery={setSearchQuery} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-500 mb-8">My Blog Posts</h1>

        {filteredPosts.length === 0 ? (
          <p className="text-gray-400">You haven't written any posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow relative"
              >
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="text-blue-400 hover:text-blue-600"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-400 hover:text-red-600"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-400 mb-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-300 line-clamp-3">
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
};

export default MyPosts;
