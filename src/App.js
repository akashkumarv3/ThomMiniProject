// src/App.js

import React from 'react';
import Login from './Components/Login/Login.js' 
import './App.css';
import backgroundImage from './assests/BG-img.png'; // Import your background image


const App = () => {
  return (
    <div className="app-container" >
    <Login />
  </div>
  );
};

export default App;
