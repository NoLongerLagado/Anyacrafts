import React from 'react';
import { Link } from 'react-scroll';

const Header = () => {
  return (
    <header>
      <input type="checkbox" name="" id="toggler" />
      <label htmlFor="toggler" className="fas fa-bars"></label>

      <a href="#" className="logo">Anyacrafts<span>.</span></a>

      <nav className="navbar">
        <Link to="home" smooth={true} duration={250}>Home</Link>
        <Link to="about" smooth={true} duration={250}>About</Link>
        <Link to="products" smooth={true} duration={250}>Products</Link>
        <Link to="custom-button-section" smooth={true} duration={250}>Customization</Link>
        <Link to="review" smooth={true} duration={250}>Review</Link>
      </nav>

      <div className="icons">
        <a href="#" id="cartIcon" className="fas fa-shopping-cart">
          <span id="cartCount" className="cart-count">0</span>
        </a>
        <a href="userprofileindex.html" id="userProfileButton" className="fas fa-user"></a>
      </div>
    </header>
  );
};

export default Header;
