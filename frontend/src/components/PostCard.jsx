import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ title, summary,id,image }) => {

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg hover:shadow-blue-800 transition overflow-hidden">
      <img
        src={`${image}`}
        alt="Post cover"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{summary}</p>
        <Link to={`/post/${id}`}>
          <button className="mt-4 text-sky-400 hover:underline text-sm">Read more →</button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
