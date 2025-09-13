import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    posts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching dashboard:", err.message);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-600 py-20 dark:text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-16 px-6 transition-colors dark:bg-gray-950 dark:text-white">
      <h1 className="text-4xl font-extrabold mb-10 text-indigo-600 tracking-tight dark:text-blue-500">
        📊 Your Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-500">📝 Posts</h2>
          <p className="text-4xl font-extrabold mt-3 text-gray-900 dark:text-white">{stats.totalPosts}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-pink-600 dark:text-pink-500">❤️ Likes</h2>
          <p className="text-4xl font-extrabold mt-3 text-gray-900 dark:text-white">{stats.totalLikes}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-500">💬 Comments</h2>
          <p className="text-4xl font-extrabold mt-3 text-gray-900 dark:text-white">{stats.totalComments}</p>
        </div>
      </div>

      {/* Per-Post Analytics */}
      <div className="max-w-5xl mx-auto space-y-8">
        {stats.posts.map((post) => {
          const engagement = post.likes + post.comments;
          const maxEngagement = Math.max(engagement, 20);
          const percentage = Math.min((engagement / maxEngagement) * 100, 100);

          return (
            <div
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl dark:bg-gray-900 dark:border-gray-800"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-indigo-600 dark:text-sky-500">
                  {post.title}
                </h2>
                <span className="text-gray-500 text-sm dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3 dark:bg-gray-800">
                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-300 dark:bg-sky-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <span className="text-indigo-600 font-semibold dark:text-blue-500">👍 {post.likes} Likes</span>
                <span className="text-green-600 font-semibold dark:text-green-500">💬 {post.comments} Comments</span>
                <span className="text-gray-600 font-semibold dark:text-gray-400">📊 {engagement} Engagement</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
