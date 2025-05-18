import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // simulate registration
    navigate('/'); // redirect to home
  };

  return (
    <div className="auth-background">
    {/* <div className="auth-color-strip"></div> */}
  <div className="auth-container">
    <img src="/images/logo2.png" alt="Logo" className="auth-logo" />
    
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Enter</button>
      </form>
      <p className="auth-link">
        Already have an account? <span onClick={() => navigate('/login')}>Sign In</span>
      </p>
    </div>
    </div>
  );
};

export default Register;
