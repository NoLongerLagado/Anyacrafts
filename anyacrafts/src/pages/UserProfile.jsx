import React, { useContext } from "react";
import { UserContext } from "../components/UserContext";
import Header from "../pages/Header";
import Account from "../pages/Account";
import Footer from "../pages/Footer";
import "../styles/userprofile.css";


const UserProfile = () => {
  const { user, signOut } = useContext(UserContext);

  return (
    <div>
      <Header user={user} />
      <main>
        {user ? (
          <Account welcomeMessage={`Welcome, ${user.fullName || "User"}!`} />
        ) : (
          <p>Please sign in to view your account.</p>
        )}
        <div className="bottom">
      <a href="#home">home</a>
      <a href="#about">about</a>
      <a href="#products">products</a>
      <a href="#Customization">Customization</a>
      <a href="#review">review</a>
    </div>
    <div className="links">
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/terms-and-conditions">Terms and Conditions</a>
    </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
