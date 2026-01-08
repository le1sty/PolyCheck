export default function DisciplineCard({ discipline, onClick }) {
  const progress = discipline.progress || 0
  
  return (
    <div 
      style={{
        ...styles.card,
        '--discipline-color': discipline.color || '#ffffff'
      }}
      onClick={onClick}
    >
      <div style={styles.header}>
        <div style={styles.info}>
          <h3 style={styles.name}>{discipline.name}</h3>
          <div style={styles.stats}>
            <span style={styles.statItem}>
              <span>{discipline.completedCount || 0}/{discipline.totalCount || 0}</span>
            </span>
            <span style={styles.statItem}>
              <span>{progress}%</span>
            </span>
          </div>
        </div>
      </div>
      
      <div style={styles.progressContainer}>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${progress}%`,
              backgroundColor: discipline.color || '#ffffff'
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: 'var(--surface)',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: 'var(--shadow)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid var(--border)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  },
  info: {
    flex: 1
  },
  name: {
    margin: '0 0 0.5rem 0',
    color: 'var(--text)',
    fontSize: '1.1rem',
    fontWeight: '400'
  },
  stats: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.875rem',
    color: 'var(--text-light)'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  progressContainer: {
    margin: '1rem 0'
  },
  progressBar: {
    height: '4px',
    background: 'var(--border)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.3s ease'
  }
}