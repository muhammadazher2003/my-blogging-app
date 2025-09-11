// src/pages/EditProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const [form, setForm] = useState({
    bio: "",
    avatar: "",
    socialLinks: { website: "", twitter: "", github: "", linkedin: "" },
  });

  useEffect(() => {
    if (!user) return;
    // fetch user profile
    (async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${user.username}`);
        const fetched = res.data.user || res.data; // adapt to your response shape
        setForm({
          bio: fetched.bio || "",
          avatar: fetched.avatar || "",
          socialLinks: fetched.socialLinks || { website: "", twitter: "", github: "", linkedin: "" },
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
      setForm((p) => ({ ...p, socialLinks: { ...p.socialLinks, [key]: value } }));
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
        { bio: form.bio, avatar: form.avatar, socialLinks: form.socialLinks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/`);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400">Avatar URL</label>
            <input name="avatar" value={form.avatar} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-800 rounded-full" />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-800 rounded-lg" rows={4} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="socialLinks.website" value={form.socialLinks.website} onChange={handleChange} placeholder="Website" className="p-2 bg-gray-800 rounded-full" />
            <input name="socialLinks.twitter" value={form.socialLinks.twitter} onChange={handleChange} placeholder="Twitter" className="p-2 bg-gray-800 rounded-full" />
            <input name="socialLinks.github" value={form.socialLinks.github} onChange={handleChange} placeholder="GitHub" className="p-2 bg-gray-800 rounded-full" />
            <input name="socialLinks.linkedin" value={form.socialLinks.linkedin} onChange={handleChange} placeholder="LinkedIn" className="p-2 bg-gray-800 rounded-full" />
          </div>

          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 rounded-full">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
