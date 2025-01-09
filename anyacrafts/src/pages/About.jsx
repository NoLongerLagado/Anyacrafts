import React from 'react';
import '../styles/mainstyle.css';
import bestseller1 from "../assets/bestseller1.mp4";

const About = () => (
  <section className="about" id="about">
    <h1 className="heading"><span>about</span> us</h1>
    <div className="row">
      <div className="video-container">
        <video src={bestseller1} loop autoPlay muted></video>
        <h3>BEST SELLER BOUQUETS</h3>
      </div>
      <div className="content">
        <h3>why choose us?</h3>
        <p>Discover the difference at our flower shop, where quality meets creativity...</p>
        <a href="#" className="btn">learn more</a>
      </div>
    </div>
  </section>
);

export default About;
