// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Menu, Avatar, Typography, Select, Drawer, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  FlagOutlined,
  MessageOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const { Text } = Typography;
const { Option } = Select;

const Navbar = () => {
  const location = useLocation();
  const { user, changeRole } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const items = [
    { label: <Link to="/">Панель</Link>, key: '/', icon: <HomeOutlined /> },
    { label: <Link to="/goals">Цели</Link>, key: '/goals', icon: <FlagOutlined /> },
    { label: <Link to="/reviews">Отзывы</Link>, key: '/reviews', icon: <MessageOutlined /> },
    { label: <Link to="/analytics">Аналитика</Link>, key: '/analytics', icon: <BarChartOutlined /> },
    { label: <Link to="/final-results">Подведение итогов</Link>, key: '/final-results', icon: <FileTextOutlined /> },
  ];

  const selectedKey = items.find(item => item.key === location.pathname)?.key || '/';

  return (
    <div className={styles.navbar}>
      {/* LOGO */}
      <div className={styles.logo}>
        <span className={styles.logoText}>LOGO Performance Review</span>
      </div>

      {/* Десктопное меню */}
      <div className={styles.menuWrapper}>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          className={styles.menu}
        />
      </div>

      {/* Секция пользователя */}
      <div className={styles.userSection}>
        <Select
  value={user?.role}
  onChange={changeRole}
  style={{ width: 160}} // ширина в пикселях
  size="small"
  
>
  <Option value="employee">Employee</Option>
  <Option value="manager">Manager</Option>
  <Option value="hr">HR</Option>
  <Option value="admin">Admin</Option>
</Select>



        <Avatar icon={<UserOutlined />} />
        <Text>{user?.name || 'Пользователь'}</Text>

        {/* Бургер меню для мобильных */}
        <Button
          className={styles.mobileMenuButton}
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
        />
      </div>

      {/* Drawer для мобильного меню */}
      <Drawer
        title="Меню"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          items={items}
          onClick={() => setDrawerVisible(false)}
        />
      </Drawer>
    </div>
  );
};

export default Navbar;
