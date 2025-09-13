import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

export default function SavedPosts() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/users/${user.id}/bookmarks`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSaved(res.data);
      } catch (err) {
        console.error("Error fetching saved posts:", err);
      }
    };
    fetchSaved();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 transition-colors py-16 px-6 dark:bg-gray-950 dark:text-white">
      <h1 className="text-4xl font-extrabold mb-10 text-indigo-600 tracking-tight dark:text-blue-400">
        📑 Saved Posts
      </h1>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {saved.length > 0 ? (
          saved.map((post) => (
            <PostCard
              key={post._id}
              id={post._id}
              image={post.image}
              title={post.title}
              summary={post.content.substring(0, 100) + "..."}
            />
          ))
        ) : (
          <p className="text-gray-600 text-lg font-medium dark:text-gray-400">
            No saved posts yet.
          </p>
        )}
      </div>
    </div>
  );
}
