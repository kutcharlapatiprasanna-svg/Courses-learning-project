

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Navbar.css";

const DEFAULT_PROFILE_IMAGE =
  "https://i.pravatar.cc/150?img=47";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();

  const name = user?.name || "User";
  const email = user?.email || "Email unavailable";

  const profileImage =
    user?.profilePicture ||
    user?.avatar ||
    user?.image ||
    DEFAULT_PROFILE_IMAGE;

  const isAdmin =
    user?.role?.toLowerCase() === "admin";

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/auth/login", { replace: true });
  };

  const handleProfileClick = () => {
    setProfileOpen((previous) => !previous);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Skillora<span>.</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/lms">LMS Marketplace</Link>

        {!isAuthenticated ? (
          <div className="auth-links">
            <Link to="/auth/login" className="login-link">
              Login
            </Link>

            <Link to="/auth/register" className="register-link">
              Register
            </Link>
          </div>
        ) : (
          <div className="profile-container">
            <button
              type="button"
              className="profile-button"
              onClick={handleProfileClick}
              aria-label="Open user profile"
              aria-expanded={profileOpen}
            >
              {!imageError ? (
                <img
                  src={profileImage}
                  alt={`${name}'s profile`}
                  className="profile-circle"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="profile-fallback">
                  {name.charAt(0).toUpperCase()}
                </span>
              )}

              <span className="profile-name">
                {name}
              </span>

              <span className="dropdown-arrow">
                {profileOpen ? "▲" : "▼"}
              </span>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-top">
                  {!imageError ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="dropdown-avatar"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="dropdown-avatar-fallback">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="profile-info">
                    <strong>{name}</strong>
                    <span>{email}</span>

                    {user?.role && (
                      <small>{user.role}</small>
                    )}
                  </div>
                </div>

                <div className="dropdown-divider" />

                <Link
                  to="/"
                  onClick={() => setProfileOpen(false)}
                >
                  <span>⌂</span>
                  Home
                </Link>

               

                <button
                  type="button"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  <span>↪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
