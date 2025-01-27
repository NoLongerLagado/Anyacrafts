import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for route detection
import { Link as ScrollLink } from "react-scroll"; // Alias react-scroll's Link

const Header = ({ user }) => {
  const location = useLocation(); // Get the current location

  // Check if the current route is the user profile page
  const isUserProfilePage = location.pathname === "/user-profile";

  return (
    <header>
      <input type="checkbox" name="" id="toggler" />
      <label htmlFor="toggler" className="fas fa-bars"></label>

      <Link to="/main-page" className="logo">
        Anyacrafts<span>.</span>
      </Link>

      {/* Conditionally render navigation links */}
      {!isUserProfilePage && (
        <nav className="navbar">
          <ScrollLink to="home" smooth={true} duration={250}>
            Home
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={250}>
            About
          </ScrollLink>
          <ScrollLink to="products" smooth={true} duration={250}>
            Products
          </ScrollLink>
          <ScrollLink to="custom-button-section" smooth={true} duration={250}>
            Customization
          </ScrollLink>
        </nav>
      )}

      <div className="icons">
        <Link to="/cart-page" id="cartIcon" className="fas fa-shopping-cart"></Link>
        <Link to="/user-profile" id="userProfileButton" className="fas fa-user">
          {user && <span className="welcome-message">{user.fullName}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
