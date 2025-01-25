import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import wrap1 from '../assets/wrap1.png';
import wrap2 from '../assets/wrap2.png';
import wrap3 from '../assets/wrap3.png';
import wrap4 from '../assets/wrap4.png';
import wrap5 from '../assets/wrap5.png';
import flow1 from '../assets/flow1.png';
import flow2 from '../assets/flow2.png';
import flow3 from '../assets/flow3.png';
import flow4 from '../assets/flow4.png';
import flow5 from '../assets/flow5.png';
import flow6 from '../assets/flow6.png';
import ribbon1 from '../assets/ribbon1.png';
import ribbon2 from '../assets/ribbon2.png';
import ribbon3 from '../assets/ribbon3.png';
import ribbon4 from '../assets/ribbon4.png';
import ribbon5 from '../assets/ribbon5.png';
import topper1 from '../assets/topper1.png';
import topper2 from '../assets/topper2.png';
import leaf1 from '../assets/leaf1.png';
import butterfly1 from '../assets/butterfly1.png';
import card1 from '../assets/card1.png';
import wrap3_1 from '../assets/wrap3_1.png';
import wrap3_2 from '../assets/wrap3_2.png';
import wrap3_3 from '../assets/wrap3_3.png';
import flow3_1 from '../assets/flow3_1.png';
import flow3_2 from '../assets/flow3_2.png';
import flow3_3 from '../assets/flow3_3.png';
import flow3_4 from '../assets/flow3_4.png';
import ribbon3_1 from '../assets/ribbon3_1.png';
import ribbon3_2 from '../assets/ribbon3_2.png';
import ribbon3_3 from '../assets/ribbon3_3.png';
import topper3_1 from '../assets/topper3_1.png';
import topper3_2 from '../assets/topper3_2.png';
import leaf3_1 from '../assets/leaf3_1.png';
import butterfly3_1 from '../assets/butterfly3_1.png';
import wrap5_1 from '../assets/wrap5_1.png';
import wrap5_2 from '../assets/wrap5_2.png';
import wrap5_3 from '../assets/wrap5_3.png';
import wrap5_4 from '../assets/wrap5_4.png';
import wrap5_5 from '../assets/wrap5_5.png';
import flow5_1 from '../assets/flow5_1.png';
import flow5_2 from '../assets/flow5_2.png';
import flow5_3 from '../assets/flow5_3.png';
import flow5_4 from '../assets/flow5_4.png';
import flow5_5 from '../assets/flow5_5.png';
import ribbon5_1 from '../assets/ribbon5_1.png';
import ribbon5_2 from '../assets/ribbon5_2.png';
import ribbon5_3 from '../assets/ribbon5_3.png';
import ribbon5_4 from '../assets/ribbon5_4.png';
import ribbon5_5 from '../assets/ribbon5_5.png';
import topper5_1 from '../assets/topper5_1.png';
import topper5_2 from '../assets/topper5_2.png';
import leaf5_1 from '../assets/leaf5_1.png';
import butterfly5_1 from '../assets/butterfly5_1.png';
import "../styles/stylecustom.css";

const Customization = () => {
  const navigate = useNavigate(); 
  const basePrices = {
    option1: 100,
    option3: 300,
    option6: 600,
  };

  const imageSets = {
    option1: {
      wrappers: [wrap1, wrap2, wrap3, wrap4, wrap5],
      flowers: [flow1, flow2, flow3, flow4, flow5, flow6],
      ribbons: [ribbon1, ribbon2, ribbon3, ribbon4, ribbon5],
      addons: [topper1, topper2, leaf1, butterfly1, card1],
    },
    option3: {
      wrappers: [wrap3_1, wrap3_2, wrap3_3],
      flowers: [flow3_1, flow3_2, flow3_3, flow3_4],
      ribbons: [ribbon3_1, ribbon3_2, ribbon3_3],
      addons: [topper3_1, topper3_2, leaf3_1, butterfly3_1],
    },
    option6: {
      wrappers: [wrap5_1, wrap5_2, wrap5_3, wrap5_4, wrap5_5],
      flowers: [flow5_1, flow5_2, flow5_3, flow5_4, flow5_5],
      ribbons: [ribbon5_1, ribbon5_2, ribbon5_3, ribbon5_4, ribbon5_5],
      addons: [topper5_1, topper5_2, leaf5_1, butterfly5_1],
    },
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [movedImages, setMovedImages] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [displaySecondDropdown, setDisplaySecondDropdown] = useState(false);

  const updatePriceDisplay = () => `₱${totalPrice.toFixed(2)}`;

  const handleOptionSelect = (option, price) => {
    setSelectedOption(option);
    setTotalPrice(price);
    setDisplaySecondDropdown(true);
  };

  const handleBack = () => {
    setSelectedOption("");
    setTotalPrice(0);
    setDisplaySecondDropdown(false);
    setCurrentCategory("");
    setMovedImages([]);
  };

  const handleClear = () => {
    setTotalPrice(basePrices[selectedOption]);
    setMovedImages([]);
  };

  const handleUndo = () => {
    setMovedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.pop(); // Remove last image
      return newImages;
    });

    if (movedImages.length > 0) {
      const removedImage = movedImages[movedImages.length - 1];
      if (imageSets[selectedOption].addons.includes(removedImage)) {
        setTotalPrice((prev) => prev - 10);
      }
    } else {
      setTotalPrice(basePrices[selectedOption]);
    }
  };

  const handleAddImage = (image) => {
    setMovedImages((prevImages) => [...prevImages, image]);
    if (imageSets[selectedOption].addons.includes(image)) {
      setTotalPrice((prev) => prev + 10);
    }
  };

  const allowDrop = (e) => e.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const imageSrc = event.dataTransfer.getData("text/plain");
    setMovedImages((prevImages) => [...prevImages, imageSrc]);

    if (imageSets[selectedOption]?.addons.includes(imageSrc)) {
      setTotalPrice((prev) => prev + 10);
    }
  };

  const handleCategoryClick = (category) => setCurrentCategory(category);

  const closeCustomization = () => {
    // Reset all states
    setSelectedOption("");
    setTotalPrice(0);
    setDisplaySecondDropdown(false);
    setCurrentCategory("");
    setMovedImages([]);

    // Navigate to the Home page
    navigate("/main-page"); // Redirects to the home page
  };
  
  return (
    <div>
      <div className="shadowbox">
        <div className="shadowbox-title">{currentCategory}</div>
        {currentCategory &&
          imageSets[selectedOption]?.[currentCategory.toLowerCase()]?.map((image) => (
            <img
              key={image}
              src={image}
              alt={currentCategory}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", image)}
              className="draggable-img"
            />
          ))}
      </div>

      {selectedOption && (
        <div
          id="display-area"
          onDrop={handleDrop}
          onDragOver={allowDrop}
          style={{
            width: "500px",
            height: "500px",
            position: "absolute",
            top: "50%",
            right: "10%",
            transform: "translateY(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {Array.from(movedImages).map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt="Dropped"
              style={{
                width: "400px",
                height: "400px",
                objectFit: "contain",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      )}

      {selectedOption && (
        <div className="price-display">
          Total Price: <span>{updatePriceDisplay()}</span>
        </div>
      )}
      

      {!displaySecondDropdown && (
        <div className="dropdown-flowers">
          <div className="button-container">
            <button className="dropbtn">No. of Flowers</button>
            <button className="close-btn" onClick={closeCustomization}>X</button>
          </div>
          <div className="dropdown-content">
            {["option1", "option3", "option6"].map((option, index) => (
              <a
                key={option}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionSelect(option, basePrices[option]);
                }}
              >
                {`${[1, 3, 6][index]} pc${[1, 3, 6][index] > 1 ? "s" : ""} (₱${basePrices[option]})`}
              </a>
            ))}
          </div>
        </div>
      )}

      {displaySecondDropdown && (
        <div className="dropdown">
          <div className="button-container1">
            <button className="dropbtn">Hover to Show Menu</button>
            <button className="undo-btn" onClick={handleUndo}>
              Undo
            </button>
            <button className="clear-btn" onClick={handleClear}>
              Clear
            </button>
            <button className="dropbtn-back" onClick={handleBack}>
              Back
            </button>
          </div>
          <div className="dropdown-content">
            {Object.keys(imageSets[selectedOption]).map((category) => (
              <a key={category} href="#" onClick={(e) => handleCategoryClick(category)}>
                {category}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Customization;