import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user).id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
        setBookmarks(JSON.parse(user).bookmarks || []);
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
    if (comment.length !== 0) {
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

  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/posts/${post._id}/bookmark`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const message = res.data.message.split(" ")[0];
      const userjson = JSON.parse(user);

      if (message === "Added") {
        userjson.bookmarks
          ? userjson.bookmarks.push(id)
          : (userjson.bookmarks = [id]);
        setBookmarks((prev) => [...prev, post._id]);
        localStorage.setItem("user", JSON.stringify(userjson));
      } else if (message === "Removed") {
        userjson.bookmarks = userjson.bookmarks?.filter((b) => b !== id);
        setBookmarks((prev) => prev.filter((bookmark) => bookmark !== post._id));
        localStorage.setItem("user", JSON.stringify(userjson));
      }
    } catch (err) {
      console.error("Error bookmarking:", err);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-600 dark:text-white py-20">
        Loading...
      </div>
    );
  if (!post)
    return (
      <div className="text-center text-gray-600 dark:text-white py-20">
        Post not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar showSearch={false} />

      <main className="max-w-4xl mx-auto px-6 py-16 flex-grow">
        {/* Author Section */}
        <Link
          to={`/profile/${post.author.username}`}
          className="flex items-center gap-3 mb-8 group"
        >
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-lg font-bold text-white shadow-lg group-hover:scale-105 transition-all duration-300 dark:bg-sky-600">
            {post.author.name?.[0]?.toUpperCase() || "?"}
          </div>

          {/* Author Info */}
          <div>
            <p className="font-semibold text-indigo-600 group-hover:text-indigo-800 transition-all duration-200 dark:text-sky-400 dark:group-hover:text-sky-300">
              {post.author.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{post.author.username}
            </p>
          </div>
        </Link>

        {/* Cover Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-2xl shadow-xl mb-8 transition-transform duration-500 hover:scale-105"
          />
        )}

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 tracking-tight dark:text-white">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="text-gray-500 text-sm mb-8 dark:text-gray-400">
          By{" "}
          <span className="text-indigo-600 font-semibold dark:text-sky-400">
            {post.author?.name || "Unknown"}
          </span>{" "}
          on {new Date(post.createdAt).toLocaleDateString()}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className="ml-0 flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold transition-all duration-200 dark:text-yellow-400 dark:hover:text-yellow-300"
        >
          {bookmarks?.includes(post._id) ? (
            <>
              <FaBookmark />
              <span>Saved</span>
            </>
          ) : (
            <>
              <FaRegBookmark />
              <span>Save</span>
            </>
          )}
        </button>

        {/* Content */}
        <div className="prose max-w-none text-gray-700 mt-8 dark:prose-invert dark:text-gray-300">
          <p className="whitespace-pre-line text-lg leading-relaxed">{post.content}</p>
        </div>

        {/* Like Button */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={handleLike}
            className={`px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all duration-200 
              ${
                post.likes.includes(userId)
                  ? "bg-red-600 text-white hover:bg-red-700 shadow-md"
                  : "bg-white border border-gray-400 text-gray-700 hover:bg-indigo-50 hover:shadow-sm dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            {post.likes.includes(userId) ? "❤️ Liked " : "🤍 Like "}{" "}
            {post.likes.length}
          </button>
        </div>

        {/* Comment Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-indigo-600 pl-4 dark:text-white">
            Comments
          </h2>

          {/* Comment Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleComment();
            }}
            className="flex items-center gap-3 mb-8"
          >
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition-all duration-200 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-sky-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 shadow-lg transition-all duration-300 transform hover:scale-105 dark:bg-sky-600 dark:hover:bg-sky-700"
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
                  className="bg-white p-4 rounded-2xl shadow-md flex gap-3 dark:bg-gray-800"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold dark:bg-sky-500">
                    {c.user?.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-sky-400">
                      {c.user?.name || "Anonymous"}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet. Be the first!
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BlogPost;
