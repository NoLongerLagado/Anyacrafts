import React, { useState, useEffect } from 'react';
import '../styles/cart.css';

const Cart = ({
  isModalOpen,
  handleCloseModal,
  selectedProduct,
  cartItems,
  setCartItems,
}) => {
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when a new product is selected
  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1); // Reset quantity to 1 when a new product is selected
    }
  }, [selectedProduct]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount)); // Ensure quantity is at least 1
  };

  const addToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
  
      if (existingItemIndex > -1) {
        // Item already exists, update it
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].totalPrice =
          updatedItems[existingItemIndex].price * updatedItems[existingItemIndex].quantity;
        return updatedItems;
      }
  
      // New item, add it to the cart
      return [
        ...prevItems,
        { ...item, quantity, totalPrice: item.price * quantity },
      ];
    });
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      handleCloseModal(); // Close modal after adding to cart
    }
  };

  // Return null if the modal is not open or if no product is selected
  if (!isModalOpen || !selectedProduct) return null;

  const totalPrice = (selectedProduct.price * quantity).toFixed(2);

  return (
    <div className="cart-modal" id="cartModal">
      <div className="cart-modal-content">
        <div className="form-container">
          <h2 id="productInfoHeading">Product Information</h2>
          <div id="selectedItemDetails">
            <p><strong>Name:</strong> {selectedProduct.title}</p>
            <p><strong>Pieces:</strong> {selectedProduct.pcs}</p>
            <p><strong>Color:</strong> {selectedProduct.color}</p>
            <p><strong>Size:</strong> {selectedProduct.size}</p>
            <p><strong>Material:</strong> {selectedProduct.material}</p>
            <p><strong>Price:</strong> ₱{selectedProduct.price.toFixed(2)}</p>
            <p><strong>Total:</strong> ₱{totalPrice}</p>
          </div>
          <div className="quantity-controls">
            <button type="button" onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="text" value={quantity} readOnly className="quantity-input" />
            <button type="button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="buttons">
            <button type="button" onClick={handleAddToCart}>Confirm Add</button>
          </div>
        </div>
        <div className="image-container">
          <img id="selectedItemImage" src={selectedProduct.image} alt={selectedProduct.title} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
