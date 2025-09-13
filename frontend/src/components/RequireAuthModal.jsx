import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequireAuthModal({ isAuthenticated, children }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      navigate("/create-post");
    }
  };

  const confirmRedirect = () => {
    navigate("/signin");
  };

  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Login Required
            </h2>
            <p className="text-gray-600 text-lg font-medium dark:text-gray-300 mb-6">
              You need to be logged in to write a blog. Would you like to sign in now?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 hover:shadow-sm transition-all duration-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmRedirect}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-full font-semibold shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
