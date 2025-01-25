import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext"; // Import the UserContext
import { useDataSource } from "@firecms/core";
import { db } from "../firebaseconfig.js";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import "../styles/cart.css";

const CartPage = () => {
  const { user } = useContext(UserContext); // Access user from context
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

  const dataSource = useDataSource();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
    calculateSubtotal(storedCart);
  }, []);

  useEffect(() => {
    calculateSubtotal(cartItems);
  }, [cartItems]);

  const calculateSubtotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + (item.totalPrice || item.price), 0);
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

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (emailError) {
      setCheckoutError("Please enter a valid email address.");
      return;
    }

    const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id));
    if (selectedCartItems.length === 0) {
      setCheckoutError("Please select items to checkout.");
      return;
    }

    if (!user) {
      setCheckoutError("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      ...formData,
      subtotal,
      orderDate: new Date(),
      status: "pending",
      selectedItems: selectedCartItems,
      userId: user.uid, // Now using the user object from context
    };

    try {
      setLoading(true);

      // Use Firestore SDK to add a new document
      await addDoc(collection(db, "orders"), orderData);

      // Optionally, send confirmation email
      emailjs
        .send(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          {
            to_name: `${formData.firstName} ${formData.lastName}`,
            to_email: formData.email,
            message: `Thank you for your order! Your order is now pending confirmation.`,
          },
          "YOUR_USER_ID"
        )
        .then(() => {
          console.log("Confirmation email sent.");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });

      // Clear cart
      localStorage.removeItem("cartItems");
      setCartItems([]);
      setSelectedItems([]);

      alert("Order placed successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Failed to save order:", error.message);
      if (error.code === "permission-denied") {
        setCheckoutError("You do not have permission to perform this action. Please contact support.");
      } else {
        setCheckoutError("There was an issue saving your order. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <Link to="/main-page" className="close-button">
        Close and Continue Shopping
      </Link>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h2>{item.name}</h2>
                <p>Price: ₱{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ₱{item.totalPrice || item.price}</p>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, item.id)}
                  checked={selectedItems.includes(item.id)}
                />
                <label>Select for checkout</label>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2>Subtotal: ₱{subtotal}</h2>
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
          {emailError && <p style={{ color: "red" }}>Please enter a valid email address.</p>}
        </div>
        <div className="form-group">
          <label>Mode of Delivery:</label>
          <select
            name="modeOfDelivery"
            value={formData.modeOfDelivery}
            onChange={handleInputChange}
            required
          >
            <option value="lalamove">Lalamove Delivery</option>
            <option value="pickup">Pick-up</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Checkout"}
        </button>
        {checkoutError && <p style={{ color: "red" }}>{checkoutError}</p>}
      </form>
    </div>
  );
};

export default CartPage;
