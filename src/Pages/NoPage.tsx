import React from "react";
import { Link } from "react-router-dom";

const NoPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link 
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary2 hover:from-primary2 hover:to-primary text-white font-medium transition-all duration-300"
          to="/"
          aria-label="Return to home page"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NoPage;
