import { useEffect, useState } from "react";
import Logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";

export default function Navbar({setSearchQuery, showSearch = true}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userlogin, setUserlogin] = useState(false);
  const token = localStorage.getItem("token");
  const [query, setQuery] = useState("");
  const isAuthenticated = !!token;
  const navigate = useNavigate();


  const handleInput = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handlesignout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserlogin(false);
    navigate('/');
    window.location.reload();
  };

  useEffect(()=>{setUserlogin(isAuthenticated)},[])

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center" onClick={()=>navigate("/")}>
            <img
              className="h-6 w-auto"
              src={Logo}
              alt="Logo"
            />
          </div>

          {/* Search */}
          {showSearch && (<div className="flex-1 px-4">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
                placeholder="Search"
                className="block w-full bg-gray-800 text-white rounded-md pl-10 pr-3 py-2 focus:outline-none focus:bg-gray-700"
              />
            </div>
          </div>)}

          {/* Avatar (click dropdown) */}
          <div className="relative hidden md:block">
            {userlogin? (
              <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 rounded-full px-3 py-2"
            >
              <svg
                className="h-6 w-6"
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
            ):(
              <a href="/signin"><button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">Sign In</button></a>
            )}

            {/* Dropdown menu (on click) */}
            {dropdownOpen && userlogin && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 border-t border-gray-800 text-white py-2 z-50">
                <a href="/create-post" className="block px-4 py-2 hover:bg-gray-800 font-medium">Write new Blog</a>
                <a href="/myprojects" className="block px-4 py-2 hover:bg-gray-800">My Blogs</a>
                <div className="border-t border-gray-700 my-2 mx-4"></div>
                <a href="#" className="block px-4 py-2 hover:bg-gray-800">Your Profile</a>
                <button onClick={handlesignout} className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-800">Sign out</button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            {userlogin? (
              <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-800"
            >
              <svg
                className="h-6 w-6"
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
            ):(
              <a href="/signin"><button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">Sign In</button></a>
            )}
            
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-1 bg-gray-900 border-t border-gray-800">
          <a href="/create-post" className="block px-3 py-2 rounded-md hover:bg-gray-800">Write new Blog</a>
          <a href="/myprojects" className="block px-3 py-2 rounded-md hover:bg-gray-800">My Blogs</a>
          <div className="border-t border-gray-700 mt-2 pt-2">
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-800">Your Profile</a>
            <button onClick={handlesignout} className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-800">Sign out</button>
          </div>
        </div>
      )}
    </nav>
  );
}
