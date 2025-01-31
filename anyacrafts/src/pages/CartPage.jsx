import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext"; // Import the UserContext
import { useDataSource } from "@firecms/core";
import { db } from "../firebaseconfig.js";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import "../styles/CartPage.css";

const CartPage = () => {
  const { user } = useContext(UserContext); // Access user from context
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    modeOfDelivery: "lalamove",
    paymentMode: "gcash",
  });
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const dataSource = useDataSource();

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
      totalPrice: (item.quantity || 1) * item.price,
    }));
    setCartItems(updatedCart);
    calculateSubtotal(updatedCart);
  }, []);

  // Recalculate subtotal when cartItems or selectedItems change
  useEffect(() => {
    calculateSubtotal(cartItems);
  }, [cartItems, selectedItems]);

  const calculateSubtotal = (items) => {
    const subtotal = items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((acc, item) => acc + (item.totalPrice || item.price), 0);
    setSubtotal(subtotal);
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailPattern.test(formData.email));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "modeOfDelivery") {
      setFormData({
        ...formData,
        modeOfDelivery: value,
        paymentMode: value === "lalamove" ? "gcash" : "cashonpickup",
      });
    }
  };

  const handleCheckboxChange = (e, itemId) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const handleQuantityChange = (index, change) => {
    const newCartItems = [...cartItems];
    const newQuantity = newCartItems[index].quantity + change;
    if (newQuantity > 0) {
      newCartItems[index].quantity = newQuantity;
      newCartItems[index].totalPrice = newQuantity * newCartItems[index].price;
      setCartItems(newCartItems);
      saveCartItems(newCartItems);
    }
  };

  const handleRemoveItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    saveCartItems(newCartItems);
  };

  const saveCartItems = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
  
    if (emailError) {
      setCheckoutError("Please enter a valid email address.");
      return;
    }
  
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    if (selectedCartItems.length === 0) {
      setCheckoutError("Please select items to checkout.");
      return;
    }
  
    if (!user) {
      setCheckoutError("You must be logged in to place an order.");
      return;
    }

    if (formData.modeOfDelivery !== "pickup" && !formData.address) {
      setCheckoutError("Please enter a delivery address.");
      return;
    }
  
    const selectedItemsDetails = selectedCartItems
      .map(
        (item) =>
          `${item.title} - Quantity: ${item.quantity}, Price: ₱${item.price}, Total: ₱${item.totalPrice}`
      )
      .join("\n");
  
    console.log("Selected Items Details:", selectedItemsDetails);
  
    const orderData = {
      ...formData,
      subtotal,
      orderDate: new Date(),
      status: "pending",
      selectedItems: selectedCartItems.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      })),
      userId: user.uid,
    };
  
    console.log("Order Data:", orderData);
  
    try {
      setLoading(true);
  
      // Save the order to Firestore
      await addDoc(collection(db, "orders"), orderData);
  
      // Mapping of payment modes to their corresponding EmailJS configurations
      const emailConfigs = {
        gcash: { template: "template_9mvi7zl", service: "service_2q98lcs", key: "wfeU7qRWckiwTYpcn" },
        bpi: { template: "template_r6dmiwt", service: "service_tq1zeg9", key: "6p6Qbw63G-IxYR9cy" },
        paypal: { template: "template_r131ard", service: "service_tq1zeg9", key: "6p6Qbw63G-IxYR9cy" },
        "cashonpickup": { template: "template_519z7ce", service: "service_cacixtw", key: "IfCQ4IXwMy3zgyZEl"},
      };
  
      const paymentConfig = emailConfigs[formData.paymentMode];
  
      if (!paymentConfig) {
        setCheckoutError("Invalid payment mode selected.");
        setLoading(false);
        return;
      }
  
      // Send a confirmation email via EmailJS
      await emailjs.send(
        paymentConfig.service,
        paymentConfig.template,
        {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          paymentMode: formData.paymentMode,
          selectedItems: selectedItemsDetails,
          modeOfDelivery: formData.modeOfDelivery,
          status: "Pending",
          orderDate: new Date().toLocaleDateString(),
        },
        paymentConfig.key
      );
  
      console.log("Confirmation email sent.");
  
      // Clear cart
      localStorage.removeItem("cartItems");
      setCartItems([]);
      setSelectedItems([]);
  
      alert("Order placed successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Failed to save order:", error.message);
      setCheckoutError("There was an issue saving your order. Please try again.");
      setLoading(false);
    }
  };
  
  
  const renderOrderSummary = () => {
    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    if (selectedCartItems.length === 0) return <p>No items selected for checkout.</p>;

    return (
      <div>
        <h3>Order Summary:</h3>
        <ul>
          {selectedCartItems.map((item, index) => (
            <li key={index}>
              {item.title} - ₱{item.price} x {item.quantity} = ₱{item.totalPrice}
            </li>
          ))}
        </ul>
        <h4>Total: ₱{selectedCartItems.reduce((acc, item) => acc + item.totalPrice, 0)}</h4>
      </div>
    );
  };

  const renderPaymentOptions = () => {
    const options =
      formData.modeOfDelivery === 'lalamove'
        ? ['gcash', 'paymaya', 'bpi']
        : ['cash-on-pickup', 'gcash', 'paypal', 'bpi']; // Updated options for pick-up

    return (
      <select
        name="paymentMode"
        value={formData.paymentMode}
        onChange={handleInputChange}
        required
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === 'cash-on-pickup' ? 'Cash on Pick-up' : option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    );
  };

  const handleSoftClose = () => {
    window.history.back(); // Navigates to the previous page, cart items remain in localStorage
  };

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <button className="close-button" onClick={handleSoftClose}>x</button> {/* Soft close */}
      {isVisible && (
        <div className="cart">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, item.id)}
                      checked={selectedItems.includes(item.id)}
                    />
                  </div>
                  <img src={item.image} alt={item.title} />
                  <div className="item-info">
                    <h2>{item.title}</h2>
                    <p>Price: ₱{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    {/* Add subtotal for each item */}
                    <p>Item Subtotal: ₱{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveItem(index)}>Remove</button>
                </div>
              ))}
            </div>
          )}
          <h2 className="subtotal">Subtotal: ₱{subtotal}</h2>
          {renderOrderSummary()}
          <div className="buyer-info">
            <h2>Buyer Information</h2>
            <form onSubmit={handleCheckout}>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Email:</label>
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
                {emailError && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
              </div>
              <div className="form-group">
                <label>Mode of Delivery:</label>
                <select
                  name="modeOfDelivery"
                  value={formData.modeOfDelivery}
                  onChange={handleInputChange}
                  required
                >
                  <option value="lalamove">Lalamove</option>
                  <option value="pick-up">Pick-up</option>
                </select>
              </div>
              <div className="form-group">
                <label>Payment Mode:</label>
                {renderPaymentOptions()}
              </div>
              <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Checkout"}
        </button>
        {checkoutError && <p style={{ color: "red" }}>{checkoutError}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
