import { useState } from 'preact/hooks'
import { useStore } from '../store'
import { SwipeableDisciplineCard } from '../components/SwipeableDisciplineCard'

export function Home({ navigate }) {
  const { user, getDisciplinesByGroup, getTasksStats, addDiscipline, deleteDiscipline } = useStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDisciplineName, setNewDisciplineName] = useState('')
  
  const disciplines = user?.groupId 
    ? getDisciplinesByGroup(user.groupId)
    : getDisciplinesByGroup('it-101')

  const stats = getTasksStats?.() || { completed: 0, total: 0, completionRate: 0 }

  const handleDisciplineClick = (disciplineId) => {
    navigate('discipline', disciplineId)
  }
  
  const handleDeleteDiscipline = (disciplineId) => {
    deleteDiscipline(disciplineId)
  }
  
  const handleAddDiscipline = (e) => {
    e.preventDefault()
    if (!newDisciplineName.trim()) return
    
    addDiscipline(newDisciplineName.trim(), user?.groupId || 'it-101')
    setNewDisciplineName('')
    setShowAddForm(false)
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <div style={styles.userDetails}>
            <h2 style={styles.userName}>{user?.name}</h2>
            <p style={styles.groupName}>
              {user?.groupId 
                ? useStore.getState().groups.find(g => g.id === user.groupId)?.name 
                : 'ИТ-101'}
            </p>
          </div>
        </div>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{disciplines.length}</span>
              <span style={styles.statLabel}>Дисциплин</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{stats.completed}</span>
              <span style={styles.statLabel}>Выполнено</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{stats.completionRate || 0}%</span>
              <span style={styles.statLabel}>Прогресс</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Дисциплины</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            style={styles.addButton}
          >
            {showAddForm ? '×' : '+'}
          </button>
        </div>
        
        {showAddForm && (
          <form onSubmit={handleAddDiscipline} style={styles.addForm}>
            <div style={styles.formGroup}>
              <input
                type="text"
                value={newDisciplineName}
                onChange={(e) => setNewDisciplineName(e.target.value)}
                placeholder="Название новой дисциплины"
                style={styles.input}
                autoFocus
              />
            </div>
            <div style={styles.formActions}>
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                style={styles.cancelButton}
              >
                Отмена
              </button>
              <button 
                type="submit"
                style={styles.submitButton}
                disabled={!newDisciplineName.trim()}
              >
                Добавить
              </button>
            </div>
          </form>
        )}

        {disciplines.length === 0 ? (
          <div style={styles.emptyState}>
            <h3 style={styles.emptyTitle}>Нет дисциплин</h3>
            <p style={styles.emptyText}>Добавьте первую дисциплину</p>
            <button 
              onClick={() => setShowAddForm(true)}
              style={styles.addFirstButton}
            >
              Добавить дисциплину
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {disciplines.map(discipline => (
              <SwipeableDisciplineCard
                key={discipline.id}
                discipline={discipline}
                onClick={() => handleDisciplineClick(discipline.id)}
                onDelete={handleDeleteDiscipline}
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
    minHeight: 'calc(100vh - 70px)',
    backgroundColor: 'var(--background)'
  },
  header: {
    background: 'var(--surface)',
    color: 'var(--text)',
    padding: '1rem',
    borderBottom: '1px solid var(--border)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  userDetails: {
    flex: 1,
    minWidth: 0
  },
  userName: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '400',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  groupName: {
    margin: '0.25rem 0 0 0',
    opacity: 0.7,
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
    background: 'var(--background)',
    borderRadius: '8px',
    padding: '0.75rem 0.5rem',
    border: '1px solid var(--border)'
  },
  statContent: {
    flex: 1,
    minWidth: 0
  },
  statValue: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  statLabel: {
    display: 'block',
    fontSize: '0.7rem',
    opacity: 0.7,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  content: {
    padding: '1rem'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  sectionTitle: {
    margin: 0,
    color: 'var(--text)',
    fontSize: '1.1rem',
    fontWeight: '400'
  },
  addButton: {
    background: 'var(--primary)',
    color: 'var(--background)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addForm: {
    background: 'var(--surface)',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid var(--border)'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    backgroundColor: 'var(--background)',
    color: 'var(--text)'
  },
  formActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  cancelButton: {
    flex: 1,
    background: 'transparent',
    color: 'var(--text)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0.75rem',
    fontSize: '0.95rem',
    cursor: 'pointer'
  },
  submitButton: {
    flex: 1,
    background: 'var(--primary)',
    color: 'var(--background)',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem',
    fontSize: '0.95rem',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.75rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    background: 'var(--surface)',
    borderRadius: '12px',
    border: '1px solid var(--border)'
  },
  emptyTitle: {
    margin: '0 0 0.5rem 0',
    color: 'var(--text)',
    fontSize: '1.1rem',
    fontWeight: '400'
  },
  emptyText: {
    margin: '0 0 1rem 0',
    color: 'var(--text-light)',
    fontSize: '0.9rem'
  },
  addFirstButton: {
    background: 'var(--primary)',
    color: 'var(--background)',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.95rem',
    cursor: 'pointer'
  }
}