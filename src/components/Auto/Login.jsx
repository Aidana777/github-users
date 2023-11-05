// Login.js
import React from 'react';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  // const clientIdSecret = 'eda401925570dd5c2747ce9a04ad78999a1dc860';
  const clientId = '8e3fb8a3e6a9fd276f4c';

  const handleLogin = () => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`;

    // Redirect the user to GitHub for authorization
    window.location.href = authUrl;
  };

  return (
    <div className="login-container"> {/* Apply a class to the container */}
      <button onClick={handleLogin} className="login-button">Login with GitHub</button> {/* Apply a class to the button */}
    </div>
  );
};

export default Login;

