// src/components/Navbar.jsx
import React from 'react';
import { Menu, Avatar, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  FlagOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import logo from '../assets/wink_tv.svg';
import styles from './Navbar.module.css';

const { Text } = Typography;

const Navbar = () => {
  const location = useLocation();

  const items = [
    { label: <Link to="/">Панель</Link>, key: '/', icon: <HomeOutlined /> },
    { label: <Link to="/goals">Цели</Link>, key: '/goals', icon: <FlagOutlined /> },
    { label: <Link to="/reviews">Отзывы</Link>, key: '/reviews', icon: <MessageOutlined /> },
    { label: <Link to="/analytics">Аналитика</Link>, key: '/analytics', icon: <FlagOutlined /> },
    { label: <Link to="/final-results">Подведение итогов</Link>, key: '/final-results', icon: <FileTextOutlined /> },
  ];

let selectedKey = items.find(item => item.key === location.pathname)?.key || '/';

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Логотип" className={styles.logoImage} />
        <span className={styles.logoText}>Performance Review</span>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={items}
        className={styles.menu}
      />

      <div className={styles.userSection}>
        <Avatar icon={<UserOutlined />} />
        <Text style={{ marginLeft: 8 }}>Дмитрий</Text>
      </div>
    </div>
  );
};

export default Navbar;
