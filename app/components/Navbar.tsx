import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar-modern">
      <div className="nav-container">
        <Link to={"/"} className="nav-logo">
          <div className="logo-icon">📊</div>
          <span className="logo-text">AI Resume</span>
        </Link>
        <Link to={"/upload"} className="nav-upload-btn">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Upload Resume</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
