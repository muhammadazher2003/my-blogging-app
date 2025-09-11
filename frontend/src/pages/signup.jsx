import React, {useState} from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdVpnKey } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username:"",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log(res.data);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Sign Up
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Create an account to get started!
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <div className="flex items-center border border-gray-700 rounded-md px-3 bg-gray-800 focus-within:border-blue-500">
              <label htmlFor="name">
                <FaUserCircle className="text-gray-400 mr-2" />
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-gray-500 py-2 focus:outline-none"
                placeholder="Jon Snow"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-700 rounded-md px-3 bg-gray-800 focus-within:border-blue-500">
              <label htmlFor="email">
                <IoMdMail className="text-gray-400 mr-2" />
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-gray-500 py-2 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>
          {/*UserName*/}
          <div>
            <label htmlFor="username" className="block text-sm text-gray-300 mb-1">
              UserName
            </label>
            <div className="flex items-center border border-gray-700 rounded-md px-3 bg-gray-800 focus-within:border-blue-500">
              <label htmlFor="username">
                <FaUserCircle className="text-gray-400 mr-2" />
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-gray-500 py-2 focus:outline-none"
                placeholder="Jon Snow"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-700 rounded-md px-3 bg-gray-800 focus-within:border-blue-500">
              <label htmlFor="password">
                <MdVpnKey className="text-gray-400 mr-2" />
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-gray-500 py-2 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white py-2 px-4 rounded-full shadow-md transition duration-300"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* Already have an account */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-sky-500 hover:underline">
            Sign in
          </a>
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
