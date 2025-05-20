import React, { useState, useRef } from 'react';
import { Menu as AntMenu } from 'antd';
import { HomeOutlined, BookOutlined, FileTextOutlined, CodeOutlined, BarChartOutlined, DashboardOutlined, EditOutlined, ReadOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth_context';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { getInitials } from '../pages/info/info';

const menuItems = [
  { label: <Link to="/">Home</Link>, key: '/', icon: <HomeOutlined /> },
  { label: <Link to="/lesson">Lesson</Link>, key: '/lesson', icon: <BookOutlined /> },
  { label: <Link to="/practice">Practice</Link>, key: '/practice', icon: <FileTextOutlined /> },
  { label: <Link to="/workspace">Workspace</Link>, key: '/workspace', icon: <CodeOutlined /> },
];

const menuItemsAdmin = [
  { label: <Link to="/dashboard">Bảng thống kê</Link>, key: '/dashboard', icon: <BarChartOutlined /> },
  { label: <Link to="/customer">Quản lí người dùng</Link>, key: '/customer', icon: <UserOutlined /> },
  { label: <Link to="/permission">Quản lí quyền</Link>, key: '/permission', icon: <SafetyOutlined /> },
  { label: <Link to="/practice-management">Quản lí bài học</Link>, key: '/practice-management', icon: <ReadOutlined /> },
  { label: <Link to="/lession-management">Quản lí bài tập</Link>, key: '/lession-management', icon: <EditOutlined /> },
];
const NavigationMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // Khai báo rõ kiểu ref ở đây:
  const menuRef = useRef<Menu>(null);

  const selectedKey = menuItemsAdmin.find(item => item.key === location.pathname)?.key || '/';

  const menuItemsUser = [
    { label: 'Thông tin cá nhân', command: () => navigate(`/profile?userId=${user?.id}`) },
    {
      label: 'Đăng xuất',
      command: () => {
        logout();
        navigate('/login');
      },
    },
  ];
  console.log(user)
  return (
    // Full-screen fixed nav bar
    <div className=" w-screen fixed top-0 left-0 z-10 flex items-center justify-between bg-white shadow-md px-6">
      <AntMenu
        theme="light"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={menuItems}
        style={{ flex: 1, border: 'none' }}
      />
      <div
        className="user-button flex items-center gap-2 hover:cursor-pointer"
        onClick={(e) => menuRef.current?.toggle(e)}
      >
        <span>{user?.fullName ?? "Người dùng"}</span>
        <Avatar label={getInitials(user?.fullName ?? "Người dùng")} className="mr-4" size="normal" />
        <Menu model={menuItemsUser} popup ref={menuRef} />
      </div>
    </div>
  );
};

export default NavigationMenu;
