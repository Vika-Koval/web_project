import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
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
    setUser(formData);
    setIsEditing(false); 
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
              <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} />
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
            {!isEditing ? (
              <>
                <p>Email: {user.email}</p>
                {user.phone && <p>Phone: {user.phone}</p>}
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                <button onClick={handleLogout}>Log Out</button>
                <button onClick={() => navigate('/products')}>Go Shop</button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form">
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Register;