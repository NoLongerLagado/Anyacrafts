import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import '../styles/mainstyle.css';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";
import image11 from "../assets/image11.png";
import image12 from "../assets/image12.png";
import image13 from "../assets/image13.png";
import image14 from "../assets/image14.png";
import image15 from "../assets/image15.png";



const Products = ({ onOpenCart }) => { 
  const [products] = useState([
    { id: 1, title: "1 PC Blue Sunflower Bouquet", price: 89, image: image1 },
    { id: 2, title: "10 PCS Green Rose Bouquet", price: 414, image: image2 },
    { id: 3, title: "1 Lily, 1 Rose and 3 Tulips Fuzzy Bouquet", price: 495, image: image3 },
    { id: 4, title: "3 PCS Sunflower Bouquet", price: 216, image: image4 },
    { id: 5, title: "5 PCS Rose Bouquet", price: 359, image: image5 },
    { id: 6, title: "Version 2 - 6 PCS Rose", price: 315, image: image6 },
    { id: 7, title: "1 Lily, 3 Daisy and 3 Tulips Fuzzy Bouquet", price: 386, image: image7 },
    { id: 8, title: "30 PCS 200 Bills Money Bouquet", price: 259, image: image8 },
    { id: 9, title: "6 Pcs Rose w/ 10 Butterfly Bouquet", price: 359, image: image9 },
    { id: 10, title: "60 Pcs Butterfly Bouquet", price: 539, image: image10 },
    { id: 11, title: "30 PCS 500 Bills Money Bouquet", price: 405, image: image11 },
    { id: 12, title: "20 PCS Blank Money Bouquet", price: 359, image: image12 },
    { id: 13, title: "10 PCS Purple Rose Bouquet", price: 414, image: image13 },
    { id: 14, title: "Version 2- 6 PCS Rose", price: 359, image: image14 },
    { id: 15, title: "7 PCS Rose Bouquet", price: 315, image: image15 },
    
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex(item => item.id === product.id);

    if (itemIndex >= 0) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setShowCart(true); 
    onOpenCart(); 
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <section className="products" id="products">
      <h1 className="heading"><span>Products</span></h1>
      <div className="box-container">
        {products.map((product) => (
          <div className="box" key={product.id}>
            <span className="discount">-10%</span>
            <div className="image">
              <img src={product.image} alt={product.title} />
              <div className="icons">
                <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
            <div className="content">
              <h3>{product.title}</h3>
              <div className="price">₱{product.price}</div>
            </div>
          </div>
        ))}
      </div>
      {showCart && (
        <Cart
          cartItems={cartItems}
          onClose={handleContinueShopping}
        />
      )}
    </section>
  );
};

export default Products;
