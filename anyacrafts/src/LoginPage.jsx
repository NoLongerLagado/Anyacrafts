import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from './firebaseconfig';  
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";  
import { ref, set } from "firebase/database";  
import emailjs from '@emailjs/browser';
import './styles/stylelogin.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState(false); 
    const [showTermsModal, setShowTermsModal] = useState(false); 

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Navigating to /main-page');
            navigate('/main-page'); // Check this in the console
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    

    const sendEmail = (email, fullname) => { //send email
        const serviceID = 'service_2q98lcs';
        const templateID = 'template_kld1ggr';
        const userID = 'wfeU7qRWckiwTYpcn';

        const templateParams = {
            user_name: fullname,
            user_email: email
        };

        emailjs.send(serviceID, templateID, templateParams, userID)
    .then((response) => {
        if (response.status === 200) {
            alert('Sign-up confirmation email sent!');
        } else {
            console.log('Unexpected status: ', response);
            alert('Failed to send confirmation email.');
        }
    }, (error) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send confirmation email. Please try again.');
    });
    };

    
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!isTermsChecked) {
            alert("Please agree to the terms & conditions.");
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userId = user.uid;
            await set(ref(database, 'users/' + userId), {
                fullName: fullName,
                email: email
            });
            alert('User signed up successfully!');
    
           
            sendEmail(email, fullName);
    
            
            setEmail('');
            setPassword('');
            setFullName('');
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="background"></div>
            <div className="container">
                <div className="content">
                <h2 className="logo">Anyacrafts<span className="dot">.</span></h2>
                    <div className="text-sci">
                        <h2><br /><span></span></h2>
                        <p>
                            Discover the difference at our flower shop, where quality<br />
                            meets creativity. Our high-quality, unique arrangements <br />
                            elevate any occasion, reflecting our commitment.
                        </p>
                        <div className="social-icons">
                            <a href="https://www.facebook.com/profile.php?id=61550571035697" target="_blank" rel="noopener noreferrer"><i className='bx bxl-facebook-circle'></i></a>
                            <a href="https://www.instagram.com/eunyssss_?igsh=MWE4ZmJsYmttcDdjcw==" target="_blank" rel="noopener noreferrer"><i className='bx bxl-instagram-alt'></i></a>
                            <a href="https://www.tiktok.com/@anyacrafts?_t=ZS-8t8yd45q6vo&_r=1" target="_blank" rel="noopener noreferrer"><i className='bx bxl-tiktok'></i></a>
                        </div>
                    </div>
                </div>

                <div className={`logreg-box ${!isLogin ? 'active' : ''}`}>
                    {isLogin ? (
                        <div className="form-box login">
                            <form onSubmit={handleLogin} id="login-form">
                                <h2>Sign In</h2>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-envelope'></i></span>
                                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-lock-alt'></i></span>
                                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label>Password</label>
                                </div>
                                <div className="remember-forgot">
                                    
                                    <Link to="/forgot-password">Forgot password?</Link>        
                                </div>
                                <button type="submit" className="login-btn" disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
                                <div className="login-register">
                                    <p>Don't have an account? <a href="#" className="register-link" onClick={() => setIsLogin(false)}>Sign Up</a></p>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="form-box register">
                            <form onSubmit={handleSignUp} id="sign-up-form">
                                <h2>Sign Up</h2>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-user'></i></span>
                                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    <label>Name</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-envelope'></i></span>
                                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-lock-alt'></i></span>
                                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label>Password</label>
                                </div>
                                <div className="termscondition">
                                    <label>
                                        <input type="checkbox" checked={isTermsChecked} onChange={(e) => setIsTermsChecked(e.target.checked)} />
                                        I agree to the <a href="#" onClick={() => setShowTermsModal(true)}>terms & conditions</a>
                                    </label>
                                </div>
                                <button type="submit" className="login-btn" disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
                                <div className="login-register">
                                    <p>Already have an account? <a href="#" className="login-link" onClick={() => setIsLogin(true)}>Sign In</a></p>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                   
                {showTermsModal && (
  <div className="login-modal">
    <div className="login-modal-content">
      <h3>Terms and Conditions</h3>
      <p className="terms-text">
        Welcome to Anyacrafts! By using our website, you agree to the following terms and conditions. 
        Please read them carefully before placing an order or browsing our site.
        <br /><br />
        <strong>1. Orders and Payments</strong><br />
        - Full payment is required before delivery.<br />
        - Payments can be made via GCash, BPI bank transfer, or PayPal for deliveries. For pickups, cash payments are accepted.<br />
        - Cancellation of confirmed orders is not allowed after checkout.<br /><br />

        <strong>2. Customization and Delivery</strong><br />
        - Custom bouquet requests should be sent via email or through our social media accounts.<br />
        - Delivery fees apply depending on the location.<br />
        - Pickup schedules must be confirmed and privately arranged.<br /><br />

        <strong>3. Returns and Refunds</strong><br />
        - Returns are not accepted for handmade bouquets and customized products.<br />
        - Claims for damages must be reported within 24 hours of receiving the item, along with photo proof.<br /><br />

        <strong>4. Privacy Policy</strong><br />
        - Any personal information collected during orders will be used solely for processing and fulfilling orders.<br /><br />

        <strong>5. Intellectual Property</strong><br />
        - All content, including images and designs, on this website is the property of Anyacrafts. Reproduction or unauthorized use is prohibited.<br /><br />

        <strong>6. Changes to Terms</strong><br />
        - Anyacrafts reserves the right to modify these terms without prior notice.<br /><br />

        For questions or concerns, please contact us through our official communication channels on Facebook, TikTok, email, or Instagram.
      </p>
      <button onClick={() => setShowTermsModal(false)}>Close</button>
    </div>
  </div>
)}
            </div>

            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        </div>
    );
};

export default LoginPage;
