import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData); // update state after register
    navigate('/'); // redirect to home or stay on /user
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="auth-background">
      <div className="auth-container">
        <img src="/images/logo2.png" alt="Logo" className="auth-logo" />
        {!user ? (
          <>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <input name="name" placeholder="Name" onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
              <button type="submit">Enter</button>
            </form>
            <p className="auth-link">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')}>Sign In</span>
            </p>
          </>
        ) : (
          <>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
