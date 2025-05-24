import React, { useRef } from 'react';
import { Menu as AntMenu } from 'antd';
import { HomeOutlined, BookOutlined, FileTextOutlined, CodeOutlined, BarChartOutlined, EditOutlined, ReadOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth_context';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { getInitials } from '../pages/info/info';

const menuItems = [
  { label: <Link to="/home">Trang chủ</Link>, key: '/home', icon: <HomeOutlined /> },
  { label: <Link to="/lesson">Bài học</Link>, key: '/lesson', icon: <BookOutlined /> },
  { label: <Link to="/practice">Thực hành</Link>, key: '/practice', icon: <FileTextOutlined /> },
  { label: <Link to="/workspace">Workspace</Link>, key: '/workspace', icon: <CodeOutlined /> },
];

const menuItemsAdmin = [
  { label: <Link to="/admin/dashboard">Bảng thống kê</Link>, key: '/admin/dashboard', icon: <BarChartOutlined /> },
  { label: <Link to="/admin/customer">Quản lí người dùng</Link>, key: '/admin/customer', icon: <UserOutlined /> },
  { label: <Link to="/admin/permission">Quản lí quyền</Link>, key: '/admin/permission', icon: <SafetyOutlined /> },
  { label: <Link to="/admin/practice-management">Quản lí bài tập</Link>, key: '/admin/practice-management', icon: <ReadOutlined /> },
  { label: <Link to="/admin/lesson-management">Quản lí bài học</Link>, key: '/admin/lesson-management', icon: <EditOutlined /> },
];
const NavigationMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAdminRoute = location.pathname.includes('/admin');

  // type of ref :
  const menuRef = useRef<Menu>(null);

const selectedKey = (isAdminRoute
  ? menuItemsAdmin.find(item => location.pathname.startsWith(item.key))
  : menuItems.find(item => location.pathname.startsWith(item.key))
)?.key || '';


  const menuItemsUser = [
    { label: 'Thông tin cá nhân', command: () => navigate(`/profile?userId=${user?.id}`) },
    ...(user?.is_admin
      ? [
        {
          label: !isAdminRoute ? 'Quản trị hệ thống' : 'Trang chủ',
          command: () => {
            if (isAdminRoute) {
              navigate('/home')
            } else {
              navigate('/admin/dashboard')
            }
          },
        },
      ]
      : []),
    {
      label: 'Đăng xuất',
      command: () => {
        logout();
        navigate('/login');
      },
    },
  ];
  return (
    <div className="z-50 w-screen h-16 fixed top-0 left-0 z-10 flex items-center justify-between bg-white shadow-md px-6">
      <AntMenu
        theme="light"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={isAdminRoute ? menuItemsAdmin : menuItems}
        style={{ flex: 1, border: 'none' }}
      />
      <div
        className="user-button flex items-center gap-2 hover:cursor-pointer"
        onClick={(e) => menuRef.current?.toggle(e)}
      >
        <span>{user?.full_name ?? "Người dùng"}</span>
        <Avatar label={getInitials(user?.full_name ?? user?.fullName ?? "Người dùng")} className="mr-4" size="normal" />
        <Menu model={menuItemsUser} popup ref={menuRef} />
      </div>
    </div>
  );
};

export default NavigationMenu;
