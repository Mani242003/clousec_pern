import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminCredentials, clearAdminCredentials } from '../../services/api';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">{children}</div>
    </div>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = !!getAdminCredentials();

  const handleLogout = () => {
    clearAdminCredentials();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ClouSec
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Home
            </Link>
            <Link to="/blogs" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Blog
            </Link>
            <Link to="/case-studies" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Case Studies
            </Link>
            <Link to="/documentation" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Documentation
            </Link>
            
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 transition duration-300">
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition duration-300">
                Admin Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blogs" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/case-studies" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link 
              to="/documentation" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            
            {isAdmin ? (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-800 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
