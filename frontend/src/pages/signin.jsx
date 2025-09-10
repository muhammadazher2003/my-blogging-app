import React, { useState } from "react";
import { MdVpnKey } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [formData, setFormData] = useState({
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
        "http://localhost:5000/api/auth/login",
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
  const handleLogin = (values) => {
    if (values) {
      navigate("/create-blog");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Sign In
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Welcome back! Please enter your credentials.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email address
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

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-blue-600 bg-gray-800 border-gray-700 rounded"
              />
              Remember me
            </label>
            <a href="#" className="hover:text-blue-400">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white py-2 px-4 rounded-full shadow-md transition duration-300"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Sign up */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-sky-500 hover:underline">
            Sign up
          </a>
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
