import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [postId, setPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("post");
    if (id) {
      setPostId(id);
      localStorage.removeItem("post");
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        const post = res.data;
        setTitle(post.title);
        setImage(post.image);
        setTags(post.tags.join(", "));
        setContent(post.content);
      } catch (err) {
        console.error("Error fetching post:", err.message);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (!postId) {
        // Create
        await axios.post(
          "http://localhost:5000/api/posts",
          {
            title,
            content,
            image,
            tags: tags.split(",").map((tag) => tag.trim()),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Update
        await axios.put(
          `http://localhost:5000/api/posts/${postId}`,
          {
            title,
            content,
            image,
            tags: tags.split(",").map((tag) => tag.trim()),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      navigate("/");
    } catch (err) {
      console.error("❌ Error saving post:", err.response?.data || err.message);
      alert("Failed to save post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-16 px-6 transition-colors dark:bg-gray-950 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl p-10 dark:bg-gray-900 dark:border-gray-800">
        <h1 className="text-4xl font-extrabold mb-10 text-indigo-600 tracking-tight dark:text-blue-500">
          {postId ? "Edit Blog Post" : "Write a New Blog"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-lg px-5 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-blue-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold dark:text-gray-300">
              Cover Image URL
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-lg px-5 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-blue-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold dark:text-gray-300">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-lg px-5 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-blue-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="e.g. react, javascript, blog"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold dark:text-gray-300">
              Content
            </label>
            <textarea
              className="w-full h-80 bg-white border border-gray-200 rounded-lg px-5 py-3 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-blue-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Start writing your blog here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 shadow-lg transition-all duration-300 transform hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {postId ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
