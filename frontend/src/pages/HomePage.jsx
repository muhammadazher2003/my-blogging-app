import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import RequireAuthModal from "../components/RequireAuthModal";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const isAuthenticated = !!token;

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    searchQuery
      ? post.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar setSearchQuery={setSearchQuery} />

      {/* Hero Section */}
      <section className="py-20 text-center bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover & Share Stories
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-6">
          Welcome to your favorite blogging space. Read. Write. Connect.
        </p>
        <RequireAuthModal isAuthenticated={isAuthenticated}>
          <button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
            Start Writing
          </button>
        </RequireAuthModal>
      </section>

      {/* Latest Posts */}
      <section className="py-14 px-6 md:px-12 bg-gray-950">
        <h2 className="text-2xl font-semibold mb-8 text-white border-l-4 border-blue-600 pl-4">
          Latest Posts
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  image={post.image}
                  title={post.title}
                  summary={(post.content || "").substring(0, 100) + "..."}
                  postId={post._id}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
