import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mainstyle.css'; 

const Customization = () => {
  return (
    <section className="custom-button-section" id="custom-button-section">
      <div className="button-container">
        <Link to="./LoginPage.jsx" className="custom-btn">
          Custom Now
        </Link>
      </div>
    </section>
  );
};
 
export default Customization;
