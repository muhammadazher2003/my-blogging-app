import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar({ setSearchQuery, showSearch = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userlogin, setUserlogin] = useState(false);
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const userName = userData ? JSON.parse(userData).username : null;
  const [query, setQuery] = useState("");
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  const handleInput = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handlesignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserlogin(false);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    setUserlogin(isAuthenticated);
  }, []);

  return (
    <nav className="bg-white text-gray-900 border-b border-gray-100 shadow-lg dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="h-9 w-auto transition-transform duration-300 hover:scale-110 dark:h-6" src={Logo} alt="Logo" />
          </div>

          {/* Search */}
          {showSearch && (
            <div className="flex-1 px-4">
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m1.85-4.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  onChange={handleInput}
                  type="text"
                  placeholder="Search posts..."
                  className="block w-full bg-white text-gray-900 rounded-full pl-10 pr-3 py-2.5 
                            border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400
                            dark:focus:ring-blue-400 
                            focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md 
                            dark:bg-gray-800 dark:text-white dark:focus:bg-gray-700"
                />
              </div>
            </div>
          )}

          {/* Avatar (click dropdown) */}
          <div className="relative hidden md:block">
            {userlogin ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 rounded-full px-3 py-2 hover:bg-indigo-50 
                          transition-all duration-300 dark:hover:bg-gray-800"
              >
                <svg
                  className="h-6 w-6 text-gray-700 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {dropdownOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            ) : (
              <a href="/signin">
                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 
                            text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all 
                            duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-sky-500 dark:text-white dark:font-semibold dark:rounded-full dark:shadow-lg dark:transition-all dark:duration-300"
                >
                  Sign In
                </button>
              </a>
            )}

            {/* Dropdown menu (on click) */}
            {dropdownOpen && userlogin && (
              <div
                className="absolute right-0 mt-2 w-60 rounded-2xl shadow-xl bg-white border border-gray-100 
                          text-gray-900 py-3 z-50 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
              >
                <a
                  href="/create-post"
                  className="block px-4 py-2.5 hover:bg-indigo-50 font-semibold transition-all 
                            duration-200 dark:hover:bg-gray-800"
                >
                  Write new Blog
                </a>
                <a
                  href="/myprojects"
                  className="block px-4 py-2.5 hover:bg-indigo-50 transition-all duration-200 
                            dark:hover:bg-gray-800"
                >
                  My Blogs
                </a>
                <div className="border-t border-gray-100 my-2 mx-4 dark:border-gray-700"></div>
                <a
                  href={`/profile/${userName}`}
                  className="block px-4 py-2.5 hover:bg-indigo-50 transition-all duration-200 
                            dark:hover:bg-gray-800"
                >
                  Your Profile
                </a>
                <a
                  href={`/profile/edit`}
                  className="block px-4 py-2.5 hover:bg-indigo-50 transition-all duration-200 
                            dark:hover:bg-gray-800"
                >
                  Edit Profile
                </a>
                <div className="border-t border-gray-100 my-2 mx-4 dark:border-gray-700"></div>
                <a
                  href={`/dashboard`}
                  className="block px-4 py-2.5 hover:bg-indigo-50 transition-all duration-200 
                            dark:hover:bg-gray-800"
                >
                  Dashboard
                </a>
                <a
                  href={`/savedposts`}
                  className="block px-4 py-2.5 hover:bg-indigo-50 transition-all duration-200 
                            dark:hover:bg-gray-800"
                >
                  Saved Posts
                </a>
                <div className="border-t border-gray-100 my-2 mx-4 dark:border-gray-700"></div>
                <button
                  onClick={handlesignout}
                  className="block w-full text-left px-4 py-2.5 rounded-md hover:bg-indigo-50 
                            transition-all duration-200 dark:hover:bg-gray-800"
                >
                  Sign out
                </button>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2.5 rounded-md hover:bg-indigo-50 transition-all duration-200 
                            flex items-center w-full dark:hover:bg-gray-700"
                >
                  {theme === "dark" ? <FaSun className="text-yellow-500 mr-2" /> : <FaMoon className="text-gray-600 mr-2" />}
                  {theme === "dark" ? " Light Mode" : " Dark Mode"}
                </button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            {userlogin ? (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-indigo-50 transition-all duration-200 
                          dark:hover:bg-gray-800"
              >
                <svg
                  className="h-6 w-6 text-gray-700 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            ) : (
              <a href="/signin">
                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 
                            text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all 
                            duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl dark:bg-gradient-to-r dark:from-sky-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-sky-500 dark:text-white dark:font-semibold dark:rounded-full dark:shadow-lg dark:transition-all dark:duration-300"
                >
                  Sign In
                </button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 space-y-1 bg-white border-t border-gray-100 text-gray-900 
                    dark:bg-gray-900 dark:border-gray-800 dark:text-white"
        >
          <a
            href="/create-post"
            className="block px-4 py-2.5 rounded-md hover:bg-indigo-50 transition-all 
                      duration-200 dark:hover:bg-gray-800"
          >
            Write new Blog
          </a>
          <a
            href="/myprojects"
            className="block px-4 py-2.5 rounded-md hover:bg-indigo-50 transition-all 
                      duration-200 dark:hover:bg-gray-800"
          >
            My Blogs
          </a>
          <div className="border-t border-gray-100 my-2 dark:border-gray-700" />
          <a
            href={`/profile/${userName}`}
            className="block px-4 py-2.5 rounded-md hover:bg-indigo-50 transition-all 
                      duration-200 dark:hover:bg-gray-800"
          >
            Your Profile
          </a>
          <a
            href={`/profile/edit`}
            className="block px-4 py-2.5 rounded-md hover:bg-indigo-50 transition-all 
                      duration-200 dark:hover:bg-gray-800"
          >
            Edit Profile
          </a>
          <div className="border-t border-gray-100 my-2 dark:border-gray-700" />
          <a
            href={`/dashboard`}
            className="block px-4 py-2.5 rounded-md hover:bg-indigo-50 transition-all 
                      duration-200 dark:hover:bg-gray-800"
          >
            Dashboard
          </a>
          <a
            href={`/savedposts`}
            className="block px-4 py-2.5 rounded-md hover:bg-indigo-50 transition-all 
                      duration-200 dark:hover:bg-gray-800"
          >
            Saved Posts
          </a>
          <div className="border-t border-gray-100 my-2 dark:border-gray-700" />
          <button
            onClick={handlesignout}
            className="block w-full text-left px-4 py-2.5 rounded-md hover:bg-indigo-50 
                      transition-all duration-200 dark:hover:bg-gray-800"
          >
            Sign out
          </button>
          <button
            onClick={toggleTheme}
            className="px-4 py-2.5 rounded-md hover:bg-indigo-50 transition-all duration-200 
                      flex items-center dark:hover:bg-gray-700"
          >
            {theme === "dark" ? <FaSun className="text-yellow-500 mr-2" /> : <FaMoon className="text-gray-600 mr-2" />}
            {theme === "dark" ? " Light Mode" : " Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}