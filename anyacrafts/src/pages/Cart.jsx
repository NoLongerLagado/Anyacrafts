import React, { useEffect } from 'react';
import '../styles/cart.css';

const Cart = ({
  isModalOpen,
  handleCloseModal,
  selectedProduct,
  cartItems,
  setCartItems,
}) => {

  // Reset quantity when a new product is selected (since no quantity needed now)
  useEffect(() => {
    if (selectedProduct) {
      // Do nothing as quantity is removed
    }
  }, [selectedProduct]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1; // Increase by 1 if already in the cart
        updatedItems[existingItemIndex].totalPrice =
          updatedItems[existingItemIndex].price *
          updatedItems[existingItemIndex].quantity;
        return updatedItems;
      }

      return [
        ...prevItems,
        { ...item, quantity: 1, totalPrice: item.price * 1 }, // default quantity of 1
      ];
    });
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      handleCloseModal();
    }
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  if (!isModalOpen || !selectedProduct) return null;

  const totalPrice = (selectedProduct.price * 1).toFixed(2); // Default quantity 1

  return (
    <div className="cart-modal">
      <div className="cart-modal-content">
        <div className="form-container">
          <h2>Product Information</h2>
          <div id="selectedItemDetails">
            <p><strong>Name:</strong> {selectedProduct.title}</p>
            <p><strong>Pieces:</strong> {selectedProduct.pcs}</p>
            <p><strong>Color:</strong> {selectedProduct.color}</p>
            <p><strong>Size:</strong> {selectedProduct.size}</p>
            <p><strong>Price:</strong> ₱{selectedProduct.price.toFixed(2)}</p>
            <p><strong>Material:</strong> {selectedProduct.material}</p>
            <p><strong>Addons:</strong> {selectedProduct.addons}</p>
            <p><strong>Total:</strong> ₱{totalPrice}</p>
          </div>
          <div className="buttons">
            <button onClick={handleAddToCart}>Confirm Adding to Cart</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
        <div className="image-container">
          <img src={selectedProduct.image} alt={selectedProduct.title} />
        </div>
      </div>
    </div>
  );
};

export default Cart;