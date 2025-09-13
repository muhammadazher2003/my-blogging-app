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
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar setSearchQuery={setSearchQuery} />

      {/* Hero Section */}
      <section className="py-24 text-center bg-gradient-to-b from-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-5 text-gray-900 tracking-tight dark:text-white">
          Discover & Share Stories
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg font-medium dark:text-gray-400">
          Welcome to your favorite blogging space. Read. Write. Connect.
        </p>
        <RequireAuthModal isAuthenticated={isAuthenticated}>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 
                            text-white font-semibold py-3.5 px-10 rounded-full shadow-xl transition-all 
                            duration-300 transform hover:scale-105 hover:shadow-2xl dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-sky-500 dark:text-white dark:font-semibold dark:rounded-full dark:shadow-lg dark:transition-all dark:duration-300">
            Start Writing
          </button>
        </RequireAuthModal>
      </section>

      {/* Latest Posts */}
      <section className="py-16 px-6 md:px-12 bg-white dark:bg-gray-950 transition-colors">
        <h2 className="text-3xl font-bold mb-10 text-gray-900 border-l-4 border-indigo-600 dark:border-blue-600 pl-5 dark:text-white">
          Latest Posts
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading...
          </p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="mt-12 flex justify-center space-x-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 
                            ${currentPage === i + 1
                              ? "bg-indigo-600 text-white shadow-md dark:bg-blue-600"
                              : "bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}`}
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