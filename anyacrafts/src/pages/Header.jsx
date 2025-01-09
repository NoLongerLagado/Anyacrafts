import React from "react";
import { Link } from "react-router-dom"; // React Router's Link
import { Link as ScrollLink } from "react-scroll"; // Alias react-scroll's Link

const Header = ({ user }) => {
  return (
    <header>
      <input type="checkbox" name="" id="toggler" />
      <label htmlFor="toggler" className="fas fa-bars"></label>

      <Link to="/main-page" className="logo">Anyacrafts<span>.</span></Link>

      <nav className="navbar">
        <ScrollLink to="home" smooth={true} duration={250}>Home</ScrollLink>
        <ScrollLink to="about" smooth={true} duration={250}>About</ScrollLink>
        <ScrollLink to="products" smooth={true} duration={250}>Products</ScrollLink>
        <ScrollLink to="custom-button-section" smooth={true} duration={250}>Customization</ScrollLink>
        <ScrollLink to="review" smooth={true} duration={250}>Review</ScrollLink>
      </nav>

      <div className="icons">
        <a href="#" id="cartIcon" className="fas fa-shopping-cart">
          <span id="cartCount" className="cart-count">0</span>
        </a>
        <Link to="/user-profile" id="userProfileButton" className="fas fa-user">
          {user && <span className="welcome-message">{user.fullName}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
