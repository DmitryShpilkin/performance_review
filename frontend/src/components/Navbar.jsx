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

import { useAuth } from '../context/AuthContext'; // контекст авторизации и пользователя
import styles from './Navbar.module.css';

const { Text } = Typography;
const { Option } = Select;

const Navbar = () => {
  const location = useLocation(); // текущий путь для выделения активного пункта меню
  const { user, changeRole } = useAuth(); // пользователь и возможность менять роль
  const [drawerVisible, setDrawerVisible] = useState(false); // состояние бургер-меню для мобильных

  // =========================
  // Элементы меню
  // =========================
  const items = [
    { label: <Link to="/">Панель</Link>, key: '/', icon: <HomeOutlined /> },
    { label: <Link to="/goals">Цели</Link>, key: '/goals', icon: <FlagOutlined /> },
    { label: <Link to="/reviews">Отзывы</Link>, key: '/reviews', icon: <MessageOutlined /> },
    { label: <Link to="/analytics">Аналитика</Link>, key: '/analytics', icon: <BarChartOutlined /> },
    { label: <Link to="/final-results">Подведение итогов</Link>, key: '/final-results', icon: <FileTextOutlined /> },
  ];

  // Определяем какой пункт меню выбран в зависимости от текущего пути
  const selectedKey = items.find(item => item.key === location.pathname)?.key || '/';

  return (
    <div className={styles.navbar}>
<<<<<<< HEAD
      {/* =========================
          ЛОГОТИП
          ========================= */}
      <div className={styles.logo}>
        <span className={styles.logoText}>LOGO Performance Review</span>
=======
  <div className={styles.logo}>
  <span className={styles.logoText}>LOGO</span>
</div>


        <span className={styles.logoText}>Performance Review</span>
>>>>>>> 59831ea8408348ba6d4dc043b210d710343906d3
      </div>

      {/* =========================
          Десктопное горизонтальное меню
          ========================= */}
      <div className={styles.menuWrapper}>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          className={styles.menu}
        />
      </div>

      {/* =========================
          Секция пользователя
          ========================= */}
      <div className={styles.userSection}>
        {/* Выбор роли (для тестирования разных интерфейсов) */}
        <Select
          value={user?.role}
          onChange={changeRole}
          style={{ width: 160 }}
          size="small"
        >
          <Option value="employee">Employee</Option>
          <Option value="manager">Manager</Option>
          <Option value="hr">HR</Option>
          <Option value="admin">Admin</Option>
        </Select>

        {/* Аватар и имя пользователя */}
        <Avatar icon={<UserOutlined />} />
        <Text>{user?.name || 'Пользователь'}</Text>

        {/* Бургер-меню для мобильной версии */}
        <Button
          className={styles.mobileMenuButton}
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
        />
      </div>

      {/* =========================
          Drawer для мобильного меню
          ========================= */}
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
          onClick={() => setDrawerVisible(false)} // закрываем drawer при клике
        />
      </Drawer>
    </div>
  );
};

export default Navbar;
