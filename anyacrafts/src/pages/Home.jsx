import React from 'react';
import { Link } from 'react-scroll'
import '../styles/mainstyle.css';

const Home = () => (
  <section className="home" id="home">
    <div className="content">
      <h3>Welcome to AnyaCrafts</h3>
      <span>Everlasting Flower Bouquets.</span>
      <p>Make any occasion unforgettable with handcrafted and customized flowers by AnyaCrafts! Our passionate florists will design a one-of-a-kind arrangement that speaks volumes. Tell us your vision, and we'll use the freshest blooms to create a masterpiece that perfectly captures your style and the recipient's heart.</p>
      <Link to="products" smooth={true} duration={250} className="btn">Shop Now</Link>
    </div>
  </section>
);

export default Home;
