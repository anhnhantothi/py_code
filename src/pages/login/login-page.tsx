import React, { useState } from 'react';
import '../../assets/css/login.css'; 
import { useNavigate } from 'react-router-dom';
// import { a } from 'framer-motion/client';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('username', username);
        navigate('/', { replace: true });
      } else {
        alert(data.error || 'Login failed.');
      }

      
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error!! Login failed.');
    }
    // alert('Login submitted!');
  };

  return (
    <div className="login-wrapper">
      <form className="neumorphic-card" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input type="text" className="neumorphic-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <input type="password" className="neumorphic-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="neumorphic-button">Sign In</button>
        <p className="text-sm mt-4">
  Don't have an account? <a href="/register" style={{ color: '#3498db' }}>Register here</a>
</p>
      </form>
    </div>
  );
};

export default LoginPage;
