import React from 'react';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const handleLogin = () => {
    // Redirect the user to the server's /auth/github route for GitHub authentication
    window.location.href = 'http://localhost:3000/';
  };

  return (
    <div className="login-container">
      <button onClick={handleLogin} className="login-button">
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
