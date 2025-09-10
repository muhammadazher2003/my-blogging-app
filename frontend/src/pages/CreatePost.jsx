import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("post");
    if (id) {
      setPostId(id);
      localStorage.removeItem("post");
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/${postId}`
        );
        const post = res.data;
        setTitle(post.title);
        setImage(post.image);
        setTags(post.tags.join());
        setContent(post.content);
      } catch (err) {
        console.error("Error fetching post:", err.message);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postId == null) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
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
        navigate("/");
      } catch (err) {
        console.error(
          "❌ Error creating post:",
          err.response?.data || err.message
        );
        alert("Failed to create post. Please try again.");
      }
    }else{
      try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
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
      navigate("/");
    } catch (err) {
      console.error(
        "❌ Error creating post:",
        err.response?.data || err.message
      );
      alert("Failed to create post. Please try again.");
    }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-500">
          Write a New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block mb-1 text-gray-300">Cover Image URL</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 text-gray-300">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. react, javascript, blog"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 text-gray-300">Content</label>
            <textarea
              className="w-full h-60 bg-gray-800 border border-gray-700 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded text-white font-medium shadow"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
