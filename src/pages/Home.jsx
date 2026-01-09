import { useState, useEffect } from 'preact/hooks'
import { useStore } from '../store'
import { SwipeableDisciplineCard } from '../components/SwipeableDisciplineCard'

export function Home({ navigate }) {
  const { user, getSubjectsWithProgress, getTasksStats, addSubject, deleteSubject, loadSubjects } = useStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState('')
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        await loadSubjects();
      } catch (error) {
        console.error('Ошибка загрузки предметов:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubjects();
  }, []);
  
  const subjects = getSubjectsWithProgress();
  const stats = getTasksStats?.() || { completed: 0, total: 0, completionRate: 0 }

  const handleSubjectClick = (subjectId) => {
    navigate('discipline', subjectId)
  }
  
  const handleDeleteSubject = async (subjectId) => {
    const subjectToDelete = subjects.find(s => s.id === subjectId);
    if (!subjectToDelete) return;
    
    if (confirm(`Удалить предмет "${subjectToDelete.name}"?`)) {
      setIsDeleting(true);
      try {
        await deleteSubject(subjectId);
        // Перезагружаем предметы после удаления
        await loadSubjects();
      } catch (error) {
        console.error('Ошибка при удалении предмета:', error);
        alert('Ошибка при удалении предмета: ' + (error.message || 'Не удалось удалить предмет'));
      } finally {
        setIsDeleting(false);
      }
    }
  }
  
  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    
    setIsAdding(true);
    try {
      await addSubject(newSubjectName.trim());
      // Перезагружаем предметы после добавления
      await loadSubjects();
      setNewSubjectName('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Ошибка при добавлении предмета:', error);
      alert('Ошибка при добавлении предмета: ' + (error.message || 'Не удалось добавить предмет'));
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <div style={styles.userDetails}>
            <h2 style={styles.userName}>{user?.name}</h2>
            <p style={styles.groupName}>{user?.groupName || 'ИТ-101'}</p>
          </div>
        </div>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{subjects.length}</span>
              <span style={styles.statLabel}>Предметов</span>
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
          <h2 style={styles.sectionTitle}>Предметы</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            style={styles.addButton}
            disabled={isAdding}
          >
            {showAddForm ? '×' : '+'}
          </button>
        </div>
        
        {showAddForm && (
          <form onSubmit={handleAddSubject} style={styles.addForm}>
            <div style={styles.formGroup}>
              <input
                type="text"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                placeholder="Название нового предмета"
                style={styles.input}
                autoFocus
                disabled={isAdding}
              />
            </div>
            <div style={styles.formActions}>
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                style={styles.cancelButton}
                disabled={isAdding}
              >
                Отмена
              </button>
              <button 
                type="submit"
                style={{
                  ...styles.submitButton,
                  ...(isAdding ? styles.disabledButton : {})
                }}
                disabled={!newSubjectName.trim() || isAdding}
              >
                {isAdding ? 'Добавление...' : 'Добавить'}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div style={styles.loadingState}>
            <p style={styles.loadingText}>Загрузка предметов...</p>
          </div>
        ) : subjects.length === 0 ? (
          <div style={styles.emptyState}>
            <h3 style={styles.emptyTitle}>Нет предметов</h3>
            <p style={styles.emptyText}>Добавьте первый предмет</p>
            <button 
              onClick={() => setShowAddForm(true)}
              style={styles.addFirstButton}
              disabled={isAdding}
            >
              Добавить предмет
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {subjects.map(subject => (
              <SwipeableDisciplineCard
                key={subject.id}
                discipline={subject}
                onClick={() => handleSubjectClick(subject.id)}
                onDelete={handleDeleteSubject}
                isDeleting={isDeleting}
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
    justifyContent: 'center',
    opacity: 1,
    transition: 'opacity 0.2s'
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
  disabledButton: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.75rem'
  },
  loadingState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    background: 'var(--surface)',
    borderRadius: '12px',
    border: '1px solid var(--border)'
  },
  loadingText: {
    margin: 0,
    color: 'var(--text-light)',
    fontSize: '0.9rem'
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