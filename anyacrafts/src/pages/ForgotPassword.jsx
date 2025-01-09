import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebaseconfig';  
import { useNavigate } from "react-router-dom";
import '../styles/ForgotPassword.css';  

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    try {
      await sendPasswordResetEmail(auth, email);
      alert(`Password reset link has been sent to ${email}`);
      navigate('/'); 
    } catch (error) {
      alert(error.message); 
    }
  };

  return (
    <div className="main-container">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="input-box">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;