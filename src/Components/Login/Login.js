
import React, { useState } from 'react';
import './Login.css';
import logo from  '../../assests/Logo.png'
import eyeIcon from '../../assests/eye.png'; 
import Footer from '../Footer/Footer';
import '../Footer/Footer.css';
import axios from 'axios';


const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(true);
        setTimeout(() => {
          setPasswordVisible(false);
        }, 1000); // Show password for 1 second
    };

    const handleLogin = async () => {
      try {
        const requestBody = {
          username: username,
          password: password,
          grantType: 'password',
          appSource: 'TCS'
        };
  
        // Replace with your actual backend API endpoint
        const response = await axios.post('http://192.168.0.171:9090/login', requestBody);
  
        // Handle success, e.g., redirect to dashboard or set authentication token
        console.log('Login successful with userId :', response.data.userId);
        console.log('Login successful programList[0] :', response.data.programList[0]);
        console.log('Login successful AccesstToken :', response.data.accessToken);
        //now call new API for My profile page
        // Example usage:
const employeeId = response.data.userId;
const programId = response.data.programList[0].id;
const referralId = response.data.programList[0].status;
const bearerToken = response.data.accessToken;

fetchUserProfile(employeeId, programId, referralId, bearerToken);

      } catch (error) {
        // Handle error, e.g., display error message
       // Handle error
    if (error.response) {
    // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        setErrorMessage(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        setErrorMessage('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setErrorMessage(error.message);
      }
      }
    };

  return (
    <div className="root">
      <div className="login-form">
      <div className="Thom-field">
        <img src={logo} alt="Thom Logo" className="logo" />
        </div>
        <div className="login-form-field">
        <input type="text" placeholder="Username" className="input-field"
         value={username}
         onChange={(e) => setUsername(e.target.value)}  />
        <div className="password-field">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={eyeIcon}
            alt="Toggle Password Visibility"
            className="eye-icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        {errorMessage && (
        <div style={{ color: 'red' }}>{errorMessage}</div>
      )}
        <button className="login-button"onClick={handleLogin} >
          Login
          </button>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

const fetchUserProfile = (employeeId, programId, referralId, bearerToken) => {
  const apiUrl = `http://192.168.0.171:9091/employee/my-profile?employeeId=${employeeId}&programId=${programId}&referralId=${referralId}`;
  
  const headers = {
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json'
  };

  fetch(apiUrl, {
    method: 'GET',
    headers: headers
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
};


export default Login;
