import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


 

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const fakeUser = {
    name: 'user', 
    email: formData.email,
  };
  localStorage.setItem('user', JSON.stringify(fakeUser)); 
  navigate('/'); 
};


  return (
    <div className="auth-background">
      <div className="auth-container">
        <img src="/images/logo2.png" alt="Logo" className="auth-logo" />
        {!user ? (
          <>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <button type="submit">Enter</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p className="auth-link">
              Don't have an account?{' '}
              <span onClick={() => navigate('/user')}>Create one</span>
            </p>
          </>
        ) : (
          <>
            <h2>Welcome back, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
