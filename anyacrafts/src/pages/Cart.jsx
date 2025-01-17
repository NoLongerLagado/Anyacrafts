import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/cart.css';


const Cart = ({ isModalOpen, handleCloseModal, onContinueShopping }) => {
  const [cartItems, setCartItems] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    paymentMode: 'gcash'
  });

  useEffect(() => {
   
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  const saveCartItems = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailPattern.test(formData.email));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (index, change) => {
    const newCartItems = [...cartItems];
    const newQuantity = newCartItems[index].quantity + change;
    if (newQuantity > 0) {
      newCartItems[index].quantity = newQuantity;
      setCartItems(newCartItems);
      saveCartItems(newCartItems);
    }
  };

  const handleRemoveItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    saveCartItems(newCartItems);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!emailError) {
      emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_name: `${formData.firstName} ${formData.lastName}`,
          to_email: formData.email,
          message: `Thank you for your order! Here are your items:\n${cartItems
            .map((item) => `${item.name} - ₱${item.price} x ${item.quantity}`)
            .join('\n')}`,
        },
        'YOUR_USER_ID'
      ).then((response) => {
        console.log('Email sent successfully:', response);
        localStorage.removeItem('cartItems');
        setCartItems([]);
        handleCloseModal();
      }).catch((error) => console.error('Failed to send email:', error));
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="cart-modal" id="cartModal">
      <div className="cart-modal-content">
        <div className="form-container">
          <h2 id="checkoutHeading">Checkout Form</h2>
          <form id="checkoutForm" onSubmit={handleCheckout}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="address">Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                handleInputChange(e);
                validateEmail();
              }}
              required
            />
            {emailError && <p id="emailError" style={{ color: 'red' }}>Please enter a valid email address.</p>}

            <label htmlFor="paymentMode">Mode of Payment:</label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleInputChange}
              required
            >
              <option value="gcash">Gcash</option>
              <option value="paymaya">PayMaya</option>
              <option value="cod">Cash on Delivery</option>
            </select>

            <div id="selectedItemsSection">
              <h4>Selected Items:</h4>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="cart-item">
                    <div className="item-details">
                      <h3>{item.name} - ₱{item.price}</h3>
                      <div className="quantity-controls">
                        <button type="button" onClick={() => handleQuantityChange(index, -1)}>-</button>
                        <input type="text" value={item.quantity} readOnly className="quantity-input" />
                        <button type="button" onClick={() => handleQuantityChange(index, 1)}>+</button>
                      </div>
                      <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="buttons">
              <button type="button" onClick={onContinueShopping}>Continue Shopping</button>
              <button type="submit">Checkout</button>
            </div>
          </form>
        </div>
        <div className="image-container">
          <img id="selectedItemImage" alt="Selected Item" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
