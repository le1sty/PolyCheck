import { useState } from 'preact/hooks'
import { useStore } from '../store'

export function GroupSelect() {
  const [selectedGroup, setSelectedGroup] = useState('')
  const { groups, selectGroup, user } = useStore()

  const handleSelectGroup = () => {
    if (!selectedGroup) {
      alert('Пожалуйста, выберите группу')
      return
    }

    selectGroup(selectedGroup)
    window.location.href = '/'
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>👋 Привет, {user?.name || 'Студент'}!</h1>
          <p style={styles.subtitle}>
            Выберите свою учебную группу для продолжения
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.selection}>
            <h2 style={styles.sectionTitle}>Выберите вашу группу</h2>
            
            <div style={styles.grid}>
              {groups.map(group => (
                <div
                  key={group.id}
                  style={{
                    ...styles.groupCard,
                    ...(selectedGroup === group.id ? styles.groupCardSelected : {})
                  }}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <div style={styles.groupIcon}>👨‍🎓</div>
                  <div style={styles.groupInfo}>
                    <span style={styles.groupName}>{group.name}</span>
                    <span style={styles.groupFaculty}>{group.faculty}</span>
                  </div>
                  {selectedGroup === group.id && (
                    <div style={styles.selectedIndicator}>✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedGroup && (
            <div style={styles.selectedInfo}>
              <h3 style={styles.selectedTitle}>
                Выбрана группа: {groups.find(g => g.id === selectedGroup)?.name}
              </h3>
              <p style={styles.selectedText}>
                Будут загружены дисциплины и задачи для этой группы
              </p>
            </div>
          )}

          <div style={styles.actions}>
            <button 
              onClick={handleSelectGroup}
              style={{
                ...styles.primaryBtn,
                ...(!selectedGroup ? styles.btnDisabled : {})
              }}
              disabled={!selectedGroup}
            >
              Продолжить с выбранной группой
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem'
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: 'white'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: 0.9
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
  },
  selection: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    color: '#333',
    marginBottom: '1.5rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem'
  },
  groupCard: {
    background: '#f9fafb',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  groupCardSelected: {
    borderColor: '#4f46e5',
    background: '#e0e7ff'
  },
  groupIcon: {
    fontSize: '2rem',
    background: '#4f46e5',
    color: 'white',
    width: '50px',
    height: '50px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  groupInfo: {
    flex: 1
  },
  groupName: {
    display: 'block',
    fontWeight: 600,
    color: '#111827',
    fontSize: '1.1rem',
    marginBottom: '0.25rem'
  },
  groupFaculty: {
    display: 'block',
    color: '#6b7280',
    fontSize: '0.875rem'
  },
  selectedIndicator: {
    color: '#10b981',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  selectedInfo: {
    background: '#d1fae5',
    border: '1px solid #a7f3d0',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem'
  },
  selectedTitle: {
    color: '#065f46',
    margin: '0 0 0.5rem 0'
  },
  selectedText: {
    color: '#047857',
    margin: 0,
    fontSize: '0.875rem'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  primaryBtn: {
    width: '100%',
    padding: '1rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: '#4f46e5',
    color: 'white'
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  }
}