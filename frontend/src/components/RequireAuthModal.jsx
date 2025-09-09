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
          <div className="bg-gray-900 text-white rounded-xl p-6 w-[90%] max-w-md shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-2">Login Required</h2>
            <p className="text-sm text-gray-300 mb-6">
              You need to be logged in to write a blog. Would you like to sign in now?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmRedirect}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
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
