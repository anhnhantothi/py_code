// File: src/components/NavigationMenu.tsx
import React from 'react';
import { Menu, Button } from 'antd';
import { HomeOutlined, BookOutlined, FileTextOutlined, CodeOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth_context';

const menuItems = [
  { label: <Link to="/">Home</Link>, key: '/', icon: <HomeOutlined /> },
  { label: <Link to="/lesson">Lesson</Link>, key: '/lesson', icon: <BookOutlined /> },
  { label: <Link to="/practice">Practice</Link>, key: '/pratice', icon: <FileTextOutlined /> },
  { label: <Link to="/workspace">Workspace</Link>, key: '/workspace', icon: <CodeOutlined /> },
];

const NavigationMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {isAuthenticated, username, logout} = useAuth();  

  const selectedKey = menuItems.find(item => item.key === location.pathname)?.key || '/';

  const onAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };
  

  return (
    // Full-screen fixed nav bar
    <div className="w-screen fixed top-0 left-0 z-10 flex items-center justify-between bg-white shadow-md px-6">
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={menuItems}
        style={{ flex: 1, border: 'none' }}
      />
        <div>
          {isAuthenticated ? `Chào, ${username}` : 'Chào bạn'}
        </div>
      <Button type="primary" onClick={onAuthClick} className="ml-4">
        {isAuthenticated ? 'Logout' : 'Login'}
      </Button>
    </div>
  );
};

export default NavigationMenu;
