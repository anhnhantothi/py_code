import React from 'react';
import '../../assets/css/login.css'; // dùng chung CSS neumorphic

const RegisterPage: React.FC = () => {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Gọi API đăng ký ở đây
    alert('Registration submitted!');
  };

  return (
    <div className="login-wrapper">
      <form className="neumorphic-card" onSubmit={handleRegister}>
        <h1>Register</h1>

        <input type="text" className="neumorphic-input" placeholder="Username" required />
        <input type="email" className="neumorphic-input" placeholder="Email" required />
        <input type="password" className="neumorphic-input" placeholder="Password" required />
        <input type="password" className="neumorphic-input" placeholder="Confirm Password" required />

        <button type="submit" className="neumorphic-button">Sign Up</button>
        <p className="text-sm mt-4">
  Already have an account? <a href="/login" style={{ color: '#3498db' }}>Login here</a>
</p>

      </form>
    </div>
  );
};

export default RegisterPage;
