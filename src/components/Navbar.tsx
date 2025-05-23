import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black shadow-lg fixed w-full top-0 left-0 z-50 border-b border-gray-600">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl text-white font-bold">
            Photography
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-200 hover:text-white font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className="text-gray-200 hover:text-white font-medium transition"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="text-gray-200 hover:text-white font-medium transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-200 hover:text-white font-medium transition"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-gray-300 transition"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-3 bg-gray-800 px-4 py-3 rounded shadow-lg">
            <Link
              to="/"
              className="text-white hover:text-gray-300 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className="text-white hover:text-gray-300 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
