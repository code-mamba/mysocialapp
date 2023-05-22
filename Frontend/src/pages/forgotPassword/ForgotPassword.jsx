import React, { useState } from 'react';
import axios from 'axios';

import './forgotpassword.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/v1/auth/forgot-password', { email })
      .then((response) => {
		alert(response.data.message)
		console.log(response)
        // setMessage(response.json());
      })
      .catch((error) => {
		alert(error)
		
        // setMessage(error.response.data.message);
      });
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
		<button className='backtologin' onClick={()=>{navigate('/')}} >Back to Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ForgotPasswordForm;