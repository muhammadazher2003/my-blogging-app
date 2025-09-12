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
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">📑 Saved Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <p className="text-gray-400">No saved posts yet.</p>
        )}
      </div>
    </div>
  );
}
