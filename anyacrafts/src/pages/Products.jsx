import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import CartPage from './CartPage';
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
import image16 from "../assets/image16.png";
import image17 from "../assets/image17.png";
import image18 from "../assets/image18.png";
import image19 from "../assets/image19.png";
import image20 from "../assets/image20.png";
import image21 from "../assets/image21.png";
import image22 from "../assets/image22.png";
import image23 from "../assets/image23.png";
import image24 from "../assets/image24.png";
import image25 from "../assets/image25.png";
import image26 from "../assets/image26.png";
import image27 from "../assets/image27.png";
import image28 from "../assets/image28.png";
import image29 from "../assets/image29.png";
import image30 from "../assets/image30.png";
import image31 from "../assets/image31.png";
import image32 from "../assets/image32.png";
import image33 from "../assets/image33.png";
import image34 from "../assets/image34.png";
import image35 from "../assets/image35.png";
import image36 from "../assets/image36.png";
import image37 from "../assets/image37.png";
import image38 from "../assets/image38.png";
import image39 from "../assets/image39.png";
import image40 from "../assets/image40.png";


const Products = () => {
  const [products] = useState([
    { id: 1, title: "3 pc Tulip Bouquet", price: 450, color: "Blue", pcs: 3, type: "Tulip",  size: "Medium", image: image1 },
    { id: 2, title: "10 pcs Rose Bouquet", price: 799, color: "Green", pcs: 10, type: "Rose", size: "Medium", image: image2 },
    { id: 3, title: "6 pcs Tulip Bouquet", price: 700, color: "Blue", pcs: 6, type: "Tulip",  size: "Large", image: image3 },
    { id: 4, title: "3 pcs Sunflower Bouquet", price: 480, color: "Orange", pcs: 3, type: "Sunflower",  size: "Medium", image: image4 },
    { id: 5, title: "5 pcs Rose Bouquet", price: 480, color: ["Blue", "Pink", "Mixed"], pcs: 5, type: "Rose",  size: "Medium", image: image5 },
    { id: 6, title: "24 pcs Rose Bouquet", price: 1700, color: ["Pink", "White"], pcs: 24, type: "Rose",  size: "Large", image: image6 },
    { id: 7, title: "1 Lily, 3 Daisy and 3 Tulips Fuzzy Bouquet", price: 750, color: ["white", "Purple", "Mixed"], pcs: 7, type: "Mixed",  size: "Medium", image: image7 },
    { id: 8, title: "30 pcs 200 Bills Money Bouquet", price: 900, color: "Green", pcs: 30, type: "Money",  size: "Large", image: image8 },
    { id: 9, title: "6 pcs Rose w/ 10 Butterfly Bouquet", price: 599, color: "Pink", pcs: 16, type: "Mixed",  size: "Meduim", image: image9 },
    { id: 10, title: "60 pcs Butterfly Bouquet", price: 1200, color: "Blue", pcs: 60, type: "Butterfly",  size: "Large", image: image10 },
    { id: 11, title: "30 pcs 500 Bills Money Bouquet", price: 1100, color: "Yellow", pcs: 30, type: "Money",  size: "Large", image: image11 },
    { id: 12, title: "20 pcs Blank Money Bouquet", price: 700, color: "Red", pcs: 20, type: "Money",  size: "Large", image: image12 },
    { id: 13, title: "10 pcs Rose Bouquet", price: 799, color: "Purple", pcs: 10, type: "Rose",  size: "Meduim", image: image13 },
    { id: 14, title: "6 pcs Rose Bouquet", price: 450, color: "Purple", pcs: 6, type: "Rose",  size: "Meduim", image: image14 },
    { id: 15, title: "7 pcs Rose Bouquet", price: 650, color: "Purple", pcs: 7, type: "Rose",  size: "Small", image: image15 },
    { id: 16, title: "10 pcs Sunflower Bouquet", price: 1300, color: "Orange", pcs: 10, type: "Sunflower",  size: "Large", image: image16 },
    { id: 17, title: "6 pcs Rose w/ 10 Butterfly Bouquet", price: 599, color: "Blue", pcs: 10, type: "Mixed",  size: "Meduim", image: image17 },
    { id: 18, title: "10 pcs Sunflower Bouquet", price: 1300, color: "White", pcs: 10, type: "Sunflower",  size: "Large", image: image18 },
    { id: 19, title: "20 pcs Money Bouquet", price: 850, color: "Purple", pcs: 20, type: "Money",  size: "Large", image: image19 },
    { id: 20, title: "40 pcs Sunflower Bouquet", price: 900, color: "Purple", pcs: 40, type: "Butterfly",  size: "Large", image: image20 },
    { id: 21, title: "1 pcs Rose Bouquet", price: 99, color: "Blue", pcs: 1, type: "Rose",  size: "Small", image: image21 },
    { id: 22, title: "24 pcs Rose Bouquet", price: 1500, color: "Black", pcs: 24, type: "Rose",  size: "Large", image: image22 },
    { id: 23, title: "1 Big Lily and 6 Daisy Fuzzy Bouquet", price: 450, color: ["white", "Pink", "Mixed"], pcs: 5, type: "Mixed",  size: "Meduim", image: image23 },
    { id: 24, title: "6 pcs Tulip Bouquet", price: 700, color: "Blue", pcs: 6, type: "Tulip",  size: "Large", image: image24 },
    { id: 25, title: "40 pcs Money Bouquet", price: 2000, color: "Green", pcs: 40, type: "Money",  size: "Large", image: image25 },
    { id: 26, title: "5 pcs Rose Bouquet", price: 450, color: ["Pink", "Red"], pcs: 5, type: "Rose",  size: "Meduim", image: image26 },
    { id: 27, title: "12 pcs Rose and 3 Sunflower Bouquet", price: 1450, color: "Red", pcs: 15, type: "Mixed",  size: "Large", image: image27 },
    { id: 28, title: "6 pcs Rose w/ 10 Butterfly Bouquet", price: 599, color: "Red", pcs: 30, type: "Mixed",  size: "Small", image: image28 },
    { id: 29, title: "1 Dahlia, 2 Rose and 4 Butterfly Bouquet", price: 650, color: "Green", pcs: 16, type: "Mixed",  size: "Meduim", image: image29 },
    { id: 30, title: "40 pcs Money Bouquet", price: 2000, color: "Blue", pcs: 40, type: "Money",  size: "Large", image: image30 },
    { id: 31, title: "6 pcs Tulip Bouquet", price: 700, color: "Pink", pcs: 6, type: "Tulip",  size: "Large", image: image31 },
    { id: 32, title: "60 pcs Butterfly Bouquet", price: 1200, color: "Yellow", pcs: 60, type: "Butterfly",  size: "Large", image: image32 },
    { id: 33, title: "1 pc Sunflower and 4 Butterfly Bouquet", price: 350, color: "Blue", pcs: 6, type: "Mixed",  size: "Small", image: image33 },
    { id: 34, title: "10 pcs Money Bouquet", price: 500, color: "Pink", pcs: 10, type: "Money",  size: "Meduim", image: image34 },
    { id: 35, title: "1 pc Rose Bouquet", price: 99, color: "Red", pcs: 1, type: "Sunflower",  size: "Small", image: image35 },
    { id: 36, title: "3 pcs Tulip Bouquet", price: 480, color: "Purple", pcs: 3, type: "Tulip",  size: "Meduim", image: image36 },
    { id: 37, title: "10 pcs Sunflower Bouquet", price: 1300, color: "Blue", pcs: 10, type: "Sunflower",  size: "Large", image: image37 },
    { id: 38, title: "3 pcs Tulip Bouquet", price: 350, color: "Purple", pcs: 3, type: "Tulip",  size: "Small", image: image38 },
    { id: 39, title: "60 pcs Butterfly Bouquet", price: 1200, color: "Pink", pcs: 60, type: "Butterfly",  size: "Large", image: image39 },
    { id: 40, title: "1 Gumamela, 2 Tulip, 1 Rose Bouquet", price: 800, color: "Red", pcs: 40, type: "Mixed",  size: "Meduim", image: image40 },
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    color: "All",
    price: "All",
    pcs: "All",
    type: "All",
    size: "All"
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

   // Function to handle opening the modal and setting the selected product
   const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setSelectedProduct(product);
    setShowCart(true);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const getFilterOptions = () => {
    switch (filters.type) {
      case "Rose":
        return { pcs: [1, 3, 5, 6, 7, 8, 10, 12, 24], color: ["Red", "Blue", "Pink", "Green", "Purple", "Black"], size: ["All", "Small", "Medium", "Large"] };
      case "Tulip":
        return { pcs: [3, 6], color: ["Pink", "Purple", "Blue", "White"], size: ["All", "Small", "Medium", "Large"] };
      case "Butterfly":
        return { pcs: [5, 10, 15, 20, 25, 30, 40, 60], color: ["Blue", "Red", "Pink", "Purple", "Yellow", "Green"], size: ["All", "Small", "Medium", "Large"] };
      case "Sunflower":
        return { pcs: [1, 3, 10], color: ["Blue", "Red", "Orange", "White"], size: ["All", "Small", "Medium", "Large"] };
      case "Mixed":
        return { pcs: [], color: ["Mixed", "Purple", "Pink", "Green", "Orange", "Red", "Blue"], size: ["All", "Small", "Medium", "Large"] };
      case "Money":
        return { pcs: [10, 20, 30, 40], color: ["Yellow", "Purple", "Blue", "Red", "Pink"], size: ["All", "Small", "Medium", "Large"] };
      default:
        return { pcs: ["All", 1, 3, 5, 6, 7, 10, 20, 30, 60], color: ["All", "Blue", "Green", "Red", "Pink", "Yellow", "Mixed", "Purple", "Orange", "White"], size: ["All", "Small", "Medium", "Large"] };
    }
  };

  const { pcs: pcsOptions, color: colorOptions } = getFilterOptions();

  const filteredProducts = products.filter((product) => {
    const matchesColor = filters.color === "All" || product.color.includes(filters.color);
    const matchesPrice =
      filters.price === "All" ||
      (filters.price === "Low" && product.price <= 300) ||
      (filters.price === "Medium" && product.price > 301 && product.price <= 700) ||
      (filters.price === "High" && product.price > 701);
    const matchesPcs = filters.pcs === "All" || product.pcs === parseInt(filters.pcs);
    const matchesType = filters.type === "All" || product.type === filters.type;
    const matchesSize = filters.size === "All" || product.size === filters.size;

    return matchesColor && matchesPrice && matchesPcs && matchesType && matchesSize;
  });

  return (
    <section className="products" id="products">
      <h1 className="heading"><span>Products</span></h1>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => handleFilterChange('type', e.target.value)}>
          <option value="All">All Types</option>
          <option value="Sunflower">Sunflower</option>
          <option value="Rose">Rose</option>
          <option value="Tulip">Tulip</option>
          <option value="Butterfly">Butterfly</option>
          <option value="Mixed">Mixed</option>
          <option value="Money">Money</option>
        </select>
        <select onChange={(e) => handleFilterChange('color', e.target.value)}>
          <option value="All">All Colors</option>
          {colorOptions.map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
        <select onChange={(e) => handleFilterChange('price', e.target.value)}>
          <option value="All">All Prices</option>
          <option value="Low">Low (≤ ₱300)</option>
          <option value="Medium">Medium (₱301-₱700)</option>
          <option value="High">High ({">"} ₱701)</option>
        </select>
        {filters.type !== "Mixed" && (
          <select onChange={(e) => handleFilterChange('pcs', e.target.value)}>
            <option value="All">All Pieces</option>
            {pcsOptions.map((pcs) => (
              <option key={pcs} value={pcs}>{pcs} PCS</option>
            ))}
          </select>
        )}
        <select onChange={(e) => handleFilterChange('size', e.target.value)}>
          <option value="All">All Sizes</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      {/* Product List */}
      <div className="box-container">
        {filteredProducts.map((product) => (
          <div className="box" key={product.id}>
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
          isModalOpen={showCart}
          handleCloseModal={() => setShowCart(false)}
          selectedProduct={selectedProduct}
          cartItems={cartItems} 
          setCartItems={setCartItems} 
        />
      )}
    </section>
  );
};

export default Products;
