import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${username}`);
        setUser(res.data.user);
        setBlogs(res.data.posts); // backend returns `posts`
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [username]);

  if (!user) return <p className="text-center text-gray-600 text-lg font-medium dark:text-gray-400">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      {/* User Info */}
      <div className="max-w-3xl mx-auto text-center py-16">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt={user.name}
          className="w-36 h-36 rounded-full mx-auto border-4 border-indigo-600 dark:border-blue-600 shadow-xl transition-all duration-300 hover:scale-105"
        />
        <h1 className="text-4xl font-extrabold mt-5 text-gray-900 tracking-tight dark:text-white">
          {user.name}
        </h1>
        <p className="text-gray-500 text-lg font-medium dark:text-gray-400">@{user.username}</p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4 max-w-xl mx-auto dark:text-gray-300">
          {user.bio || "This user has no bio yet."}
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mt-6">
          {user.socialLinks?.website && (
            <a
              href={user.socialLinks.website}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 dark:text-blue-400 dark:hover:text-blue-600"
            >
              🌐 Website
            </a>
          )}
          {user.socialLinks?.twitter && (
            <a
              href={user.socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 dark:text-blue-400 dark:hover:text-blue-600"
            >
              🐦 Twitter
            </a>
          )}
          {user.socialLinks?.github && (
            <a
              href={user.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 dark:text-blue-400 dark:hover:text-blue-600"
            >
              💻 GitHub
            </a>
          )}
          {user.socialLinks?.linkedin && (
            <a
              href={user.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 dark:text-blue-400 dark:hover:text-blue-600"
            >
              🔗 LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* User Blogs */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 border-l-4 border-indigo-600 dark:border-blue-600 pl-4 dark:text-white">
          Blogs by {user.name}
        </h2>
        {blogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                image={post.image}
                title={post.title}
                summary={post.content.substring(0, 120) + "..."}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg font-medium text-center dark:text-gray-500">
            No blogs published yet.
          </p>
        )}
      </div>
    </div>
  );
}
