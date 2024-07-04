
import React, { useState } from 'react';
import './Login.css';
import logo from  '../../assests/Logo.png'
import eyeIcon from '../../assests/eye.png'; 
import Footer from '../Footer/Footer';
import '../Footer/Footer.css';


const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(true);
        setTimeout(() => {
          setPasswordVisible(false);
        }, 1000); // Show password for 1 second
    };
  return (
    <div className="root">
      <div className="login-form">
      <div className="Thom-field">
        <img src={logo} alt="Thom Logo" className="logo" />
        </div>
        <div className="login-form-field">
        <input type="text" placeholder="Username" className="input-field" />
        <div className="password-field">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="input-field"
          />
          <img
            src={eyeIcon}
            alt="Toggle Password Visibility"
            className="eye-icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        <button className="login-button">Login</button>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default Login;
