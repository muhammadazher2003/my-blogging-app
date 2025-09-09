// import React, {useState} from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const BlogPost = () => {
//   const { id } = useParams();

//   // Mock data (replace with API or context later)
//   const post = {
//     id,
//     title: `This is Blog Post #${id}`,
//     author: "John Doe",
//     date: "July 28, 2025",
//     cover: `https://source.unsplash.com/random/900x400?sig=${id}`,
//     content: `
//       <p>This is the full content of the blog post. You can add HTML content here using dangerouslySetInnerHTML.</p>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel augue quis orci tincidunt feugiat. Cras sollicitudin quam in tellus posuere, in finibus quam efficitur.</p>
//       <p>More sections... write as much content as you want.</p>
//     `,
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Navbar userstatus={true} />

//       <div className="max-w-4xl mx-auto px-4 py-12">
//         {/* Cover Image */}
//         <img
//           src={post.cover}
//           alt={post.title}
//           className="w-full h-72 object-cover rounded-lg shadow-lg mb-6"
//         />

//         {/* Title */}
//         <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

//         {/* Meta */}
//         <div className="text-gray-400 text-sm mb-6">
//           By <span className="text-sky-400 font-medium">{post.author}</span> on {post.date}
//         </div>

//         {/* Content */}
//         <div
//           className="prose prose-invert max-w-none text-gray-300"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default BlogPost;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post:", err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return <div className="text-center text-white py-20">Loading...</div>;
  if (!post)
    return <div className="text-center text-white py-20">Post not found.</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar showSearch={false} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Cover Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 object-cover rounded-lg shadow-lg mb-6"
          />
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        {/* Meta */}
        <div className="text-gray-400 text-sm mb-6">
          By{" "}
          <span className="text-sky-400 font-medium">
            {post.author?.name || "Unknown"}
          </span>{" "}
          on {new Date(post.createdAt).toLocaleDateString()}
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none text-gray-300">
          <p className="whitespace-pre-line text-gray-300">{post.content}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
