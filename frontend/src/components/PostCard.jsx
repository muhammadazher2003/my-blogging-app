import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ title, summary, id, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden dark:bg-gray-900">
      <img
        src={image}
        alt="Post cover"
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 dark:text-gray-400">
          {summary}
        </p>
        <Link to={`/post/${id}`}>
          <button className="text-indigo-600 hover:text-indigo-800 dark:text-blue-600 dark:hover:text-blue-800 font-semibold text-sm transition-all duration-200 hover:underline">
            Read more →
          </button>
        </Link>
      </div>
    </div>
  );
}
