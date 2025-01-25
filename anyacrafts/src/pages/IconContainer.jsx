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
        <h3>Lalamove Delivery</h3>
        <span>or pick-up</span>
      </div>
    </div>
    <div className="icons">
      <img src={money} alt="Free Delivery" />
      <div className="info">
        <h3>No Cancellation</h3>
        <span>of orders</span>
      </div>
    </div>
    <div className="icons">
      <img src={gift} alt="Free Delivery" />
      <div className="info">
        <h3>Loyalty Card</h3>
        <span>on first order</span>
      </div>
    </div>
    <div className="icons">
      <img src={gcash} alt="Free Delivery" />
      <div className="info">
         <h3>Secure Payment</h3>
        <span>on all orders</span>
      </div>
    </div>
  </section>
);

export default IconsContainer;
