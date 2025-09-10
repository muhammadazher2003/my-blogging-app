import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user).id;

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

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost((prev) => ({ ...prev, likes: res.data.likes }));
    } catch (err) {
      console.error("❌ Error liking post:", err);
    }
  };

  const handleComment = async () => {
    if (comment.length != 0) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `http://localhost:5000/api/posts/${post._id}/comment`,
          { text: comment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPost((prev) => ({ ...prev, comments: res.data.comments }));
        setComment("");
      } catch (err) {
        console.error("❌ Error posting comment:", err);
      }
    }
  };

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

  {/* Like Button */}
  <div className="flex items-center gap-4 mt-8">
    <button
      onClick={handleLike}
      className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 transition 
        ${
          post.likes.includes(userId)
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
        }`}
    >
      {post.likes.includes(userId) ? "❤️ Liked " : "🤍 Like "}   {post.likes.length}
    </button>
  </div>

  {/* Comment Section */}
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4">Comments</h2>

    {/* Comment Form */}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleComment();
      }}
      className="flex items-center gap-3 mb-6"
    >
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
      >
        Post
      </button>
    </form>

    {/* Comment List */}
    <div className="space-y-4">
      {post.comments?.length > 0 ? (
        post.comments.map((c) => (
          <div
            key={c._id}
            className="bg-gray-800 p-3 rounded-full shadow-sm flex gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
              {c.user?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-sm font-semibold text-sky-400">
                {c.user?.name || "Anonymous"}
              </p>
              <p className="text-gray-300">{c.text}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No comments yet. Be the first!</p>
      )}
    </div>
  </div>
</div>


      <Footer />
    </div>
  );
};

export default BlogPost;
