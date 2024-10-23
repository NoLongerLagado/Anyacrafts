import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import emailjs from 'emailjs-com';
import './stylelogin.css'; 

const firebaseConfig = {
  apiKey: "AIzaSyB-CUWSirtX8mYiN5Vnnw1i6lE-2pR70zE",
  authDomain: "anyauserlogin.firebaseapp.com",
  databaseURL: "https://anyauserlogin-default-rtdb.firebaseio.com",
  projectId: "anyauserlogin",
  storageBucket: "anyauserlogin.appspot.com",
  messagingSenderId: "517177106831",
  appId: "1:517177106831:web:30277b80f7059b4eedebfa",
  measurementId: "G-QGL1QPJHQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState(false); // Checkbox state
    const [showTermsModal, setShowTermsModal] = useState(false); // Modal state

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('User signed in successfully!');
            window.location.href = 'userprofileindex.html';
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false); 
        }
    };

    const sendEmail = (email, fullname) => {
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
    
            // Send confirmation email
            sendEmail(email, fullName);
    
            // Clear the form
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
            <header className="header"></header>
            <div className="background"></div>
            <div className="container">
                <div className="content">
                    <h2 className="logo">Anyacrafts</h2>
                    <div className="text-sci">
                        <h2><br /><span></span></h2>
                        <p>
                            Discover the difference at our flower shop, where quality<br />
                            meets creativity. Our high-quality, unique arrangements <br />
                            elevate any occasion, reflecting our commitment.
                        </p>
                        <div className="social-icons">
                            <a href="#"><i className='bx bxl-facebook-circle'></i></a>
                            <a href="#"><i className='bx bxl-instagram-alt'></i></a>
                            <a href="#"><i className='bx bxl-twitter'></i></a>
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
                                    <a href="#">Forgot password?</a>        
                                </div>
                                <button type="submit" className="btn" disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
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
                                <button type="submit" className="btn" disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
                                <div className="login-register">
                                    <p>Already have an account? <a href="#" className="login-link" onClick={() => setIsLogin(true)}>Sign In</a></p>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                    {/* Modal for Terms & Conditions */}
                {showTermsModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Terms and Conditions</h3>
                            <p>Here are the terms and conditions of using our service...</p>
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
