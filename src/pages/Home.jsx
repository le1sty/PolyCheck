import { useStore } from '../store'
import DisciplineCard from '../components/DisciplineCard'

export function Home({ navigate }) {
  const { user, getDisciplinesByGroup, getTasksStats } = useStore()
  
  const disciplines = user?.groupId 
    ? getDisciplinesByGroup(user.groupId)
    : getDisciplinesByGroup('it-101')

  const stats = getTasksStats?.() || { completed: 0, total: 0, completionRate: 0 }

  const handleDisciplineClick = (disciplineId) => {
    console.log('Переход к дисциплине:', disciplineId)
    navigate('discipline', disciplineId)
  }

  return (
    <div style={styles.page}>
      {/* Шапка с прогрессом */}
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <img 
            src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=student'} 
            alt="Аватар" 
            style={styles.avatar}
          />
          <div style={styles.userDetails}>
            <h2 style={styles.userName}>{user?.name || 'Студент'}</h2>
            <p style={styles.groupName}>
              Группа: {user?.groupId 
                ? useStore.getState().groups.find(g => g.id === user.groupId)?.name 
                : 'ИТ-101 (демо)'}
            </p>
          </div>
        </div>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📚</div>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{disciplines.length}</span>
              <span style={styles.statLabel}>Дисциплин</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>✅</div>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{stats.completed}</span>
              <span style={styles.statLabel}>Выполнено</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🎯</div>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{stats.completionRate || 0}%</span>
              <span style={styles.statLabel}>Прогресс</span>
            </div>
          </div>
        </div>
      </div>

      {/* Список дисциплин */}
      <div style={styles.content}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Мои дисциплины</h2>
        </div>

        {disciplines.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📚</div>
            <h3 style={styles.emptyTitle}>Нет дисциплин</h3>
            <p style={styles.emptyText}>Выберите группу чтобы увидеть дисциплины</p>
            <button 
              onClick={() => navigate('group-select')}
              style={styles.primaryBtn}
            >
              Выбрать группу
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {disciplines.map(discipline => (
              <DisciplineCard
                key={discipline.id}
                discipline={discipline}
                onClick={() => handleDisciplineClick(discipline.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    paddingBottom: '5rem',
    minHeight: '100vh',
    backgroundColor: 'var(--background)'
  },
  header: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: 'white',
    padding: '1rem',
    marginBottom: '1rem',
    // Убираем фиксацию - это обычный блок
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  userDetails: {
    flex: 1,
    minWidth: 0 // Чтобы текст не выходил за границы
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '2px solid white',
    flexShrink: 0
  },
  userName: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  groupName: {
    margin: '0.25rem 0 0 0',
    opacity: 0.9,
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem'
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    padding: '0.75rem 0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: 0 // Для правильного сжатия на мобильных
  },
  statIcon: {
    fontSize: '1.1rem',
    opacity: 0.9,
    flexShrink: 0
  },
  statContent: {
    flex: 1,
    minWidth: 0
  },
  statValue: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  statLabel: {
    display: 'block',
    fontSize: '0.7rem',
    opacity: 0.9,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  content: {
    padding: '0.75rem'
  },
  sectionHeader: {
    marginBottom: '1rem'
  },
  sectionTitle: {
    margin: 0,
    color: 'var(--text)',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.75rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem 1rem',
    background: 'var(--surface)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    marginTop: '1rem'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: 'var(--text-light)'
  },
  emptyTitle: {
    margin: '0 0 0.5rem 0',
    color: 'var(--text)',
    fontSize: '1.1rem'
  },
  emptyText: {
    margin: '0 0 1.5rem 0',
    color: 'var(--text-light)',
    fontSize: '0.9rem'
  },
  primaryBtn: {
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    width: '100%',
    maxWidth: '200px'
  }
}