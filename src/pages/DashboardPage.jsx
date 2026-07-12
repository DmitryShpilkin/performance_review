/* src/pages/DashboardPage.jsx */

import React, { useState, useCallback } from 'react';
import { Card, Progress, List, Statistic, Row, Col, Modal, Table } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import styles from './DashboardPage.module.css';

// Пример данных для графика (в реальности сюда придут реальные метрики)
const sampleData = [
  { name: 'Янв', 'Цель 1': 60, 'Цель 2': 75, 'Цель 3': 90 },
  { name: 'Фев', 'Цель 1': 70, 'Цель 2': 80, 'Цель 3': 60 },
  { name: 'Мар', 'Цель 1': 80, 'Цель 2': 50, 'Цель 3': 85 },
  { name: 'Апр', 'Цель 1': 90, 'Цель 2': 60, 'Цель 3': 95 },
];

// Тестовые данные команды (заменить на реальный state/API)
const teamGoals = [
  {
    name: 'Цель 1',
    progress: 70,
    details: [
      { employee: 'Иван', progress: 80, comment: 'Отлично' },
      { employee: 'Мария', progress: 60, comment: 'Нужно улучшить' },
    ],
  },
  {
    name: 'Цель 2',
    progress: 45,
    details: [
      { employee: 'Иван', progress: 50, comment: 'Средне' },
      { employee: 'Мария', progress: 40, comment: 'Могло быть лучше' },
    ],
  },
  {
    name: 'Цель 3',
    progress: 90,
    details: [
      { employee: 'Иван', progress: 95, comment: 'Превосходно' },
      { employee: 'Мария', progress: 85, comment: 'Отлично' },
    ],
  },
];

// Мемоизация компонента кастомной строки таблицы
const CustomBodyRow = React.memo(({ children, ...rest }) => (
  <tr {...rest} className={styles.darkTableRow}>
    {children}
  </tr>
));

function DashboardPage() {
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Определение цвета прогресса
  const getColor = (percent) => {
    if (percent < 50) return '#ff4d4f'; 
    if (percent < 80) return '#faad14'; 
    return '#52c41a'; 
  };

  // Колонки таблицы — используем useCallback для стабильности ссылки
  const columns = useCallback(() => ([
    {
      title: <span className={styles.whiteText}>Сотрудник</span>,
      dataIndex: 'employee',
      key: 'employee',
      render: text => <span className={styles.whiteText}>{text}</span>,
    },
    {
      title: <span className={styles.whiteText}>Прогресс %</span>,
      dataIndex: 'progress',
      key: 'progress',
      render: value => (
        <Progress
          percent={value}
          strokeColor={getColor(value)}
          format={p => <span className={styles.whiteText}>{p}%</span>}
        />
      ),
    },
    {
      title: <span className={styles.whiteText}>Комментарий</span>,
      dataIndex: 'comment',
      key: 'comment',
      render: text => <span className={styles.whiteText}>{text}</span>,
    },
  ]), []);

  /* ====================== РАСЧЕТЫ С ЗАЩИТОЙ ОТ ОШИБОК ====================== */
  
  const averageProgress = teamGoals.length > 0
    ? Math.round(teamGoals.reduce((acc, g) => acc + g.progress, 0) / teamGoals.length)
    : 0;

  const bestResult = teamGoals.length > 0
    ? Math.max(...teamGoals.map(g => g.progress))
    : 0;

  return (
    <div className={styles.dashboardPage}>
      
      {/* Верхний ряд статистических карточек */}
      <Row gutter={[20, 20]} style={{ marginBottom: '20px' }}>
        <Col xs={24} md={8}>
          <Card className={styles.card}>
            <Statistic
              title={<span className={styles.whiteText}>Всего целей</span>}
              value={teamGoals.length}
              valueStyle={{ color: 'white' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className={styles.card}>
            <Statistic
              title={<span className={styles.whiteText}>Средний прогресс</span>}
              value={averageProgress}
              suffix="%"
              valueStyle={{ color: 'white' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className={styles.card}>
            <Statistic
              title={<span className={styles.whiteText}>Лучший результат</span>}
              value={bestResult}
              suffix="%"
              valueStyle={{ color: 'white' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Список целей с прогрессом */}
      <Card title={<span className={styles.whiteText}>Прогресс целей команды</span>} className={styles.card}>
        <List
          dataSource={teamGoals}
          renderItem={goal => (
            <List.Item onClick={() => setSelectedGoal(goal)} style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                title={<span className={styles.whiteText}>{goal.name}</span>}
                description={
                  <Progress
                    percent={goal.progress}
                    strokeColor={getColor(goal.progress)}
                    format={p => <span className={styles.whiteText}>{p}%</span>}
                  />
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* График динамики */}
      <Card title={<span className={styles.whiteText}>Динамика прогресса команды</span>} className={styles.card}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleData}>
            <CartesianGrid stroke="#555" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: '#ccc' }} axisLine={{ stroke: '#555' }} />
            <YAxis tick={{ fill: '#ccc' }} axisLine={{ stroke: '#555' }} />
            <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', borderColor: '#555', color: 'white' }} />
            {teamGoals.map(goal => (
              <Line
                key={goal.name}
                type="monotone"
                dataKey={goal.name}
                stroke={getColor(goal.progress)}
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Модальное окно с деталями по цели */}
      <Modal
        title={<span style={{ color: 'white' }}>{selectedGoal?.name}</span>}
        open={!!selectedGoal}
        footer={null}
        onCancel={() => setSelectedGoal(null)}
        bodyStyle={{ backgroundColor: '#2a2a2a', color: 'white', padding: '20px' }}
        centered
      >
        {selectedGoal && (
          <Table
            dataSource={selectedGoal.details}
            columns={columns()}
            pagination={false}
            rowKey="employee"
            style={{ minWidth: '400px' }}
            components={{
              body: {
                row: CustomBodyRow
              },
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default DashboardPage;