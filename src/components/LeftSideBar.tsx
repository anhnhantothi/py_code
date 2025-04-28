import React from 'react';
import { Menu } from 'antd';
import {  useLocation } from 'react-router-dom';

// Định nghĩa kiểu cho item của sidebar
interface LeftSidebarMenuProps {
  items: any[];
}

const LeftSidebarMenu: React.FC<LeftSidebarMenuProps> = ({ items }) => {
  const location = useLocation();
  const selectedKey = items.find(item => item.key === location.pathname)?.key || '';

  return (
    <Menu
      mode="inline"
      className='text-left'
      selectedKeys={[selectedKey]}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
};

export default LeftSidebarMenu;