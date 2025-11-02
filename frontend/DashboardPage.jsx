// Импорт React-хуков и компонентов из Ant Design и Recharts
import { useState, useEffect } from 'react';
import { Card, Progress, List, Statistic, Row, Col, Modal, Table } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import styles from './DashboardPage.module.css';

/* ====================== ТЕСТОВЫЕ ДАННЫЕ ====================== */
// Эти данные используются пока нет связи с сервером.
// Позже их можно будет заменить реальными, полученными через API.
const sampleData = [
  { name: 'Янв', 'Цель 1': 60, 'Цель 2': 75, 'Цель 3': 90 },
  { name: 'Фев', 'Цель 1': 70, 'Цель 2': 80, 'Цель 3': 60 },
  { name: 'Мар', 'Цель 1': 80, 'Цель 2': 50, 'Цель 3': 85 },
  { name: 'Апр', 'Цель 1': 90, 'Цель 2': 60, 'Цель 3': 95 },
];

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

/* ====================== ОСНОВНОЙ КОМПОНЕНТ ====================== */
function DashboardPage() {
  // Состояния: выбранная цель и данные (в будущем — с сервера)
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Комментарий: когда подключишь backend — можно будет использовать это:
  /*
  const [teamGoals, setTeamGoals] = useState([]);
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    fetch('/api/goals') // Запрос к твоему API
      .then(res => res.json())
      .then(data => {
        setTeamGoals(data.teamGoals);
        setSampleData(data.progressData);
      })
      .catch(err => console.error('Ошибка загрузки данных:', err));
  }, []);
  */

  // Цвет прогресса в зависимости от процента
  const getColor = (percent) => {
    if (percent < 50) return '#ff4d4f';   // красный
    if (percent < 80) return '#faad14';   // жёлтый
    return '#52c41a';                     // зелёный
  };

  // Колонки таблицы в модальном окне
  const columns = [
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
  ];

  /* ====================== ОТРИСОВКА ИНТЕРФЕЙСА ====================== */
  return (
    <div className={styles.dashboardPage}>

      {/* Верхний ряд статистических карточек */}
      <Row gutter={[20, 20]}>
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
              value={Math.round(teamGoals.reduce((acc, g) => acc + g.progress, 0) / teamGoals.length)}
              suffix="%"
              valueStyle={{ color: 'white' }}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className={styles.card}>
            <Statistic
              title={<span className={styles.whiteText}>Лучший результат</span>}
              value={Math.max(...teamGoals.map(g => g.progress))}
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
            <CartesianGrid stroke="#555" />
            <XAxis dataKey="name" tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', color: 'white' }} />
            {teamGoals.map(goal => (
              <Line
                key={goal.name}
                type="monotone"
                dataKey={goal.name}
                stroke={getColor(goal.progress)}
                strokeWidth={3}
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
  bodyStyle={{ backgroundColor: '#2a2a2a', color: 'white' }}
  style={{ top: 20 }}
>
  {selectedGoal && (
    <Table
      dataSource={selectedGoal.details}
      columns={columns}
      pagination={false}
      rowKey="employee"
      style={{ color: 'white', backgroundColor: '#2a2a2a' }}
      rowClassName={() => 'darkTableRow'}
    />
  )}
</Modal>



    </div>
  );
}

/* ====================== ЭКСПОРТ КОМПОНЕНТА ====================== */
export default DashboardPage;
