// File: src/components/NavigationMenu.tsx
import React from 'react';
import { Menu, Button } from 'antd';
import { HomeOutlined, BookOutlined, FileTextOutlined, CodeOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth_context';

const menuItems = [
  { label: <Link to="/">Home</Link>, key: '/', icon: <HomeOutlined /> },
  { label: <Link to="/lesson">Lesson</Link>, key: '/lesson', icon: <BookOutlined /> },
  { label: <Link to="/practice">Practice</Link>, key: '/practice', icon: <FileTextOutlined /> },
  { label: <Link to="/workspace">Workspace</Link>, key: '/workspace', icon: <CodeOutlined /> },
];

{/* <Route path="/customer" element={<CustomerManage />} />
<Route path="/permission" element={<PermissionManage />} />
<Route path="/dashboard" element={<DashboardPage />} />
<Route path="/practice-management" element={<PracticeManage />} /> */}
const menuItemsAdmin = [
  { label: <Link to="/dashboard">Dashboard</Link>, key: '/dashboard', icon: <FileTextOutlined /> },
  { label: <Link to="customer/">Customer</Link>, key: '/customer', icon: <HomeOutlined /> },
  { label: <Link to="/permission">Permission</Link>, key: '/permission', icon: <BookOutlined /> },
  { label: <Link to="/practice-management">Practice management</Link>, key: '/practice-management', icon: <CodeOutlined /> },
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
        items={menuItemsAdmin}
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
