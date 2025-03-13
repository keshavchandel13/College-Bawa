import React from "react";
import { Link } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi"; // You can use any icon you prefer

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 p-6">
      <div className="bg-white rounded-2xl shadow-lg px-10 py-12 max-w-md w-full text-center">
        <BiErrorCircle className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">404</h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
