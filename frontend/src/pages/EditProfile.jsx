// src/pages/EditProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [form, setForm] = useState({
    bio: "",
    avatar: "",
    socialLinks: { website: "", twitter: "", github: "", linkedin: "" },
  });

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${user.username}`
        );
        const fetched = res.data.user || res.data;
        setForm({
          bio: fetched.bio || "",
          avatar: fetched.avatar || "",
          socialLinks:
            fetched.socialLinks || {
              website: "",
              twitter: "",
              github: "",
              linkedin: "",
            },
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];
      setForm((p) => ({
        ...p,
        socialLinks: { ...p.socialLinks, [key]: value },
      }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/users/update",
        {
          bio: form.bio,
          avatar: form.avatar,
          socialLinks: form.socialLinks,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/`);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-16 px-6 transition-colors dark:bg-gray-950 dark:text-white">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-600 tracking-tight dark:text-blue-500">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-400">
              Avatar URL
            </label>
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              className="w-full mt-2 px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-blue-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-400">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full mt-2 px-5 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-blue-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["website", "twitter", "github", "linkedin"].map((platform) => (
              <input
                key={platform}
                name={`socialLinks.${platform}`}
                value={form.socialLinks[platform]}
                onChange={handleChange}
                placeholder={platform.charAt(0).toUpperCase() + platform.slice(1)}
                className="px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-blue-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 shadow-lg transition-all duration-300 transform hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
