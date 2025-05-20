// File: src/pages/LoginPage.tsx
import React, { useState } from 'react';
import '../../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import { login, LoginCredentials } from '../../services/loginService';
import { useAuth } from '../../context/auth_context';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: loginContextFn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credentials: LoginCredentials = { username, password };
      const result = await login(credentials, loginContextFn); // Gọi API và cập nhật AuthContext

      if (result.success) {
        navigate('/', { replace: true }); // Chuyển trang ngay
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="neumorphic-card" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="text"
          className="neumorphic-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className="neumorphic-button">
          Sign In
        </button>
        <p className="text-sm mt-4">
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#3498db' }}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
