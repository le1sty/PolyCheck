export default function DisciplineCard({ discipline, onClick }) {
  const progress = discipline.progress || 0
  
  return (
    <div 
      style={{
        ...styles.card,
        '--discipline-color': discipline.color || '#4f46e5'
      }}
      onClick={onClick}
    >
      <div style={styles.header}>
        <div 
          style={{
            ...styles.icon,
            backgroundColor: discipline.color || '#4f46e5'
          }}
        >
          {discipline.name.charAt(0)}
        </div>
        <div style={styles.info}>
          <h3 style={styles.name}>{discipline.name}</h3>
          <div style={styles.stats}>
            <span style={styles.statItem}>
              <span>✅</span>
              <span>{discipline.completedCount || 0}/{discipline.totalCount || 0}</span>
            </span>
            <span style={styles.statItem}>
              <span>📊</span>
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
              width: `${progress}%`
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
    borderRadius: '16px',
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
  icon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    flexShrink: 0
  },
  info: {
    flex: 1
  },
  name: {
    margin: '0 0 0.5rem 0',
    color: 'var(--text)',
    fontSize: '1.1rem'
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
    height: '6px',
    background: 'var(--border)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'var(--discipline-color, #4f46e5)',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  }
}