import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({ totalPosts: 0, totalLikes: 0, totalComments: 0, posts: [] });
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

  if (loading) return <div className="text-center text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-6">
      <h1 className="text-2xl font-bold mb-8">📊 Your Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-800 text-center">
          <h2 className="text-xl font-semibold text-sky-400">📝 Posts</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalPosts}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-800 text-center">
          <h2 className="text-xl font-semibold text-pink-400">❤️ Likes</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalLikes}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow border border-gray-800 text-center">
          <h2 className="text-xl font-semibold text-green-400">💬 Comments</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalComments}</p>
        </div>
      </div>

      {/* Per-Post Analytics */}
      <div className="space-y-6">
        {stats.posts.map((post) => {
          const engagement = post.likes + post.comments;
          const maxEngagement = Math.max(engagement, 20); // avoid empty bars
          const percentage = Math.min((engagement / maxEngagement) * 100, 100);

          return (
            <div
              key={post.id}
              className="bg-gray-900 p-5 rounded-xl shadow border border-gray-800"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-sky-400">
                  {post.title}
                </h2>
                <span className="text-gray-400 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                <div
                  className="bg-sky-500 h-3 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <span className="text-blue-400">👍 {post.likes} Likes</span>
                <span className="text-green-400">💬 {post.comments} Comments</span>
                <span className="text-gray-400">📊 {engagement} Engagement</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
