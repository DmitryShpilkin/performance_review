/* src/components/Navbar.jsx */

import React, { useState } from 'react';
import { Menu, Avatar, Typography, Select, Drawer, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  FlagOutlined,
  MessageOutlined,
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
  const auth = useAuth();
  
  const [drawerVisible, setDrawerVisible] = useState(false);

  if (!auth || !auth.user) return null; 

  const { user, changeRole } = auth;

  /* ==========================
     ИЗМЕНЕНО ЗДЕСЬ:
     Обернули <Link> в <span> с явным цветом текста
     ========================== */
  const items = [
    { 
      label: (
        <span style={{ color: 'white', textDecoration: 'none' }}>
          <Link to="/">Панель</Link>
        </span>
      ), key: '/', icon: <HomeOutlined /> 
    },
    { 
      label: (
        <span style={{ color: 'white', textDecoration: 'none' }}>
          <Link to="/goals">Цели</Link>
        </span>
      ), key: '/goals', icon: <FlagOutlined /> 
    },
    { 
      label: (
        <span style={{ color: 'white', textDecoration: 'none' }}>
          <Link to="/reviews">Отзывы</Link>
        </span>
      ), key: '/reviews', icon: <MessageOutlined /> 
    },
    { 
      label: (
        <span style={{ color: 'white', textDecoration: 'none' }}>
          <Link to="/analytics">Аналитика</Link>
        </span>
      ), key: '/analytics', icon: <BarChartOutlined /> 
    },
    { 
      label: (
        <span style={{ color: 'white', textDecoration: 'none' }}>
          <Link to="/final-results">Подведение итогов</Link>
        </span>
      ), key: '/final-results', icon: <FileTextOutlined /> 
    },
  ];

  const selectedKey = items.find(item => item.key === location.pathname)?.key || '/';

  return (
    <div className={styles.navbar}>
      
      {/* ЛОГОТИП */}
      <div className={styles.logo}>
        <span className={styles.logoText}>LOGO Performance Review</span>
      </div>

      {/* МЕНЮ */}
      <div className={styles.menuWrapper}>
        <div className={styles.menuContainer}>
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={items}
            className={styles.menu}
          />
        </div>
      </div>

      {/* СЕКЦИЯ ПОЛЬЗОВАТЕЛЯ */}
      <div className={styles.userSection}>
        
        {/* Селектор роли */}
        <Select
          value={user.role}
          onChange={changeRole}
          style={{ width: 160 }}
          size="small"
          dropdownClassName={styles.dropdownFix}
          className={styles.roleSelect}
        >
          <Option value="employee">Employee</Option>
          <Option value="manager">Manager</Option>
          <Option value="hr">HR</Option>
          <Option value="admin">Admin</Option>
        </Select>

        <Avatar>{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</Avatar>
        <Text strong className={styles.username}>{user?.name || 'Пользователь'}</Text>

        <Button className={styles.mobileMenuButton} icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} />
      </div>

      <Drawer title="Меню" placement="right" onClose={() => setDrawerVisible(false)} visible={drawerVisible} bodyStyle={{ padding: 0 }}>
        <Menu mode="vertical" selectedKeys={[selectedKey]} items={items} onClick={() => setDrawerVisible(false)} />
      </Drawer>
    </div>
  );
};

export default Navbar;