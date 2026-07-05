import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="container-custom py-24 text-center">
      <h1 className="text-6xl font-extrabold text-primary-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary inline-flex items-center gap-2">
        <FiHome /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
