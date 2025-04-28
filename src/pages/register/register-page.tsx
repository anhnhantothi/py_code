import '../../assets/css/login.css'; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();  

  const handleRegister = async (e: React.FormEvent) => {


    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try{
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        navigate('/', { replace: true });
      } else {
        alert(data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Server error!! Registration failed.');
    }
    
    // alert('Registration submitted!');
  };

  return (
    <div className="login-wrapper">
      <form className="neumorphic-card" onSubmit={handleRegister}>
        <h1>Register</h1>
        <input
          type="text"
          className="neumorphic-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          className="neumorphic-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="neumorphic-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="neumorphic-input"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="neumorphic-button">Sign Up</button>
        <p className="text-sm mt-4">
  Already have an account? <a href="/login" style={{ color: '#3498db' }}>Login here</a>
</p>

      </form>
    </div>
  );
};

export default RegisterPage;
