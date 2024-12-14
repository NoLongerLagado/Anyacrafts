import React, { useState, useEffect, useRef } from 'react';
import Header from '../pages/Header';
import Home from '../pages/Home';
import About from '../pages/About';
import IconContainer from '../pages/IconContainer';
import Products from '../pages/Products';
import Customization from '../pages/Customization';
import Cart from '../pages/Cart';
import '../styles/chatbot.css'; // Ensure this file contains styles for the chatbot

const MainPage = () => {
  // States for cart modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationMessage] = useState('');

  // States for chatbot
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'incoming', text: 'Hi there 👋\nHow can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatboxRef = useRef(null);

  const mainOptions = {
    "How to order?": "Kindly add an item to cart or you can customize your own bouquet and then send it to us",
    "What is your best seller type of bouquet?": "Our best sellers are butterfly bouquets",
    "Where can I find your store": "Brgy Sto. Domingo Binan City, Laguna",
  };

  const subOptions = {
    "How to order?": {
      "What is your mode of payment?": "Gcash and BPI but no Cash on Delivery",
      "What is your mode of delivery?": "JNT, Lalamove and pick up",
    },
    "What is your best seller type of bouquet?": {
      "Can I customize my own bouquet? (optional)": "Yes, go to our customization page and send us your own design.",
      "What are the bouquets you offer?": "🌳Butterfly bouquets,🌹Rose Bouquets (Satin Ribbon / Fuzzy),🌻Sunflower Bouquets (Satin Ribbon / Fuzzy),🌷Tulip Bouquets (Fuzzy),🌸Gumamela and Lily Bouquets(Fuzzy),🌼 Daisy Bouquets (Fuzzy),💵 Money Bouquets, Lei & Money Garland & Money Cordage (Any Design)",
      "Can you wrap an item for me?": "Yes, but this is only applicable if you will bring the item to our physical store.",
    },
    "Where can I find your store": {
      "Do you deliver nationwide?": "Yes, we deliver nationwide with JNT but with Lalamove Luzon only.",
      "Do I have to pay for the delivery fee?": "Yes",
      "How much is the delivery fee?": "For JNT Luzon: 123, Visayas 123, Mindanao 123, if Lalamove send your location to us so we can check it.",
      "How long does it take to deliver the bouquet to my location?": "3-7 days after ordering. If Lalamove same day delivery.",
      "Do you accept rush order?": "Yes we do but you have to pay a small fee.",
    }
  };

  const allOptions = {
    ...mainOptions,
    ...Object.assign({}, ...Object.values(subOptions))
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserQuery = (query) => {
    setMessages((prev) => [...prev, { type: 'outgoing', text: query }]);
  
    setTimeout(() => {
      // Find the appropriate response for the selected option
      const botResponse = allOptions[query] || "Sorry, I don't have an answer for that.";
      setMessages((prev) => [...prev, { type: 'incoming', text: botResponse }]);
  
      // If query has sub-options, display them
      if (subOptions[query]) {
        appendOptions(subOptions[query]);
      }
    }, 600);
  };
  
  

  const appendOptions = (options) => {
    const optionMessages = Object.keys(options).map((option) => ({
      type: 'button', // Add a 'button' type to differentiate
      text: option,
    }));
  
    setMessages((prev) => [...prev, ...optionMessages]);
  };
  
  

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    handleUserQuery(inputValue.trim());
    setInputValue('');
  };

  // Cart modal functions
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleOpenCartModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseCartModal = () => {
    setIsModalOpen(false);
  };

  const handleContinueShopping = () => {
    handleCloseCartModal();
  };

  return (
    <div className="App">
      <Header />
      <Home />
      <About />
      <IconContainer />
      <Products onOpenCart={handleOpenCartModal} />
      <Customization />
      <Cart
        isConfirmationModalOpen={isConfirmationModalOpen}
        closeConfirmationModal={closeConfirmationModal}
        confirmationMessage={confirmationMessage}
        isModalOpen={isModalOpen}
        handleCloseCartModal={handleCloseCartModal}
        handleContinueShopping={handleContinueShopping}
      />

     {/* Chatbot Component */}
<div className="chatbot-wrapper">
  <button className="chatbot-toggler" onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
    <span className="material-symbols-rounded">{isChatbotOpen ? "close" : "mode_comment"}</span>
  </button>

  <div className={`chatbot ${isChatbotOpen ? 'show' : ''}`}>
    <header>
      <h2>Chatbot</h2>
      <span
        className="close-btn material-symbols-outlined"
        onClick={() => setIsChatbotOpen(false)}
      >
        close
      </span>
    </header>
    <ul className="chatbox" ref={chatboxRef}>
  {messages.map((message, index) => (
    <li key={index} className={`chat ${message.type}`}>
      {message.type === 'button' ? (
        <button
          className="chat-option-button"
          onClick={() => handleUserQuery(message.text)}
        >
          {message.text}
        </button>
      ) : (
        <>
          <span className="material-symbols-outlined">
            {message.type === 'outgoing' ? 'person' : 'smart_toy'}
          </span>
          <p>{message.text}</p>
        </>
      )}
    </li>
  ))}
</ul>


    {/* Predefined Questions */}
    <div className="questions-container">
  {Object.keys(mainOptions).map((question, index) => (
    <button
      key={index}
      className="predefined-question"
      onClick={() => handleUserQuery(question)}
    >
      {question}
    </button>
  ))}
</div>

    <div className="chat-input">
      <textarea
        placeholder="Enter a message..."
        spellCheck="false"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      ></textarea>
      <span
        id="send-btn"
        className="material-symbols-rounded"
        onClick={handleSendMessage}
      >
        send
      </span>
    </div>
  </div>
</div>
      </div>
  );
};

export default MainPage;
