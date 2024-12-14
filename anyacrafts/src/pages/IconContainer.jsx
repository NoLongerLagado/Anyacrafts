import React from 'react';
import '../styles/mainstyle.css';
import freeD from '../assets/freeD.png';
import money from '../assets/money.jpg';
import gift from '../assets/gift.png';
import gcash from '../assets/gcashicon.jpg';

const IconsContainer = () => (
  <section className="icons-container">
    <div className="icons">
      <img src={freeD} alt="Free Delivery" />
      <div className="info">
        <h3>free delivery</h3>
        <span>on all orders</span>
      </div>
    </div>
    <div className="icons">
      <img src={money} alt="Free Delivery" />
      <div className="info">
        <h3>10 days return</h3>
        <span>on all orders</span>
      </div>
    </div>
    <div className="icons">
      <img src={gift} alt="Free Delivery" />
      <div className="info">
        <h3>offer and gifts</h3>
        <span>on all orders</span>
      </div>
    </div>
    <div className="icons">
      <img src={gcash} alt="Free Delivery" />
      <div className="info">
         <h3>secure payment</h3>
        <span>on all orders</span>
      </div>
    </div>
  </section>
);

export default IconsContainer;
