import React from 'react';
import '../../assets/css/login.css'; // file CSS riêng nhé

const LoginPage: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý login tại đây
    alert('Login submitted!');
  };

  return (
    <div className="login-wrapper">
      <form className="neumorphic-card" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input type="text" className="neumorphic-input" placeholder="Username" />
        <input type="password" className="neumorphic-input" placeholder="Password" />
        <button type="submit" className="neumorphic-button">Sign In</button>
        <p className="text-sm mt-4">
  Don't have an account? <a href="/register" style={{ color: '#3498db' }}>Register here</a>
</p>
      </form>
    </div>
  );
};

export default LoginPage;
