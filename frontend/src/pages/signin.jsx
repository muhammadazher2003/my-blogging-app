import React, { useState } from "react";
import { MdVpnKey } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 transition-colors px-6 dark:bg-gray-950">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100 transition-colors dark:bg-gray-900 dark:border-gray-800">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 tracking-tight dark:text-white mb-3">
          Sign In
        </h2>
        <p className="text-center text-gray-600 text-lg font-medium dark:text-gray-400 mb-8">
          Welcome back! Please enter your credentials.
        </p>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Email address
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-4 bg-white focus-within:ring-2 focus-within:ring-indigo-400 dark:focus-within:ring-blue-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:border-gray-700">
              <IoMdMail className="text-gray-500 dark:text-gray-400 mr-3" size={20} />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 py-3 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-4 bg-white focus-within:ring-2 focus-within:ring-indigo-400 dark:focus-within:ring-blue-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:border-gray-700">
              <MdVpnKey className="text-gray-500 dark:text-gray-400 mr-3" size={20} />
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 py-3 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-indigo-600 bg-white border-gray-200 rounded focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700"
              />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 dark:text-blue-400 dark:hover:text-blue-600 transition-all duration-200">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white py-3 px-6 rounded-full font-semibold shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl dark:from-sky-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-sky-500"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        {/* Sign up */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-semibold dark:text-sky-400 dark:hover:text-sky-300 transition-all duration-200"
          >
            Sign up
          </a>
        </p>

        {error && (
          <p className="mt-4 text-center text-red-600 font-semibold dark:text-red-400 text-sm">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}