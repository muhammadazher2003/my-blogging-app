import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-100 py-10 text-center transition-colors duration-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800">
      <p className="text-sm font-semibold tracking-wide">
        © {new Date().getFullYear()} Blogify. Built with <span className="text-indigo-600">💙</span> using React + Tailwind.
      </p>
    </footer>
  );
}