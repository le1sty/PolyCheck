export function Stats() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button onClick={() => window.location.href = '/'} style={styles.backButton}>← Назад</button>
        <h1 style={styles.title}>📊 Статистика</h1>
      </div>
      <div style={styles.content}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Здесь будет статистика</h3>
          <p style={styles.cardText}>Скоро появится визуализация прогресса по всем дисциплинам</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    paddingBottom: '5rem'
  },
  header: {
    padding: '1rem',
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface)'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '0.5rem 0'
  },
  title: {
    margin: '0.5rem 0',
    color: 'var(--text)'
  },
  content: {
    padding: '1rem'
  },
  card: {
    background: 'var(--surface)',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    boxShadow: 'var(--shadow)'
  },
  cardTitle: {
    margin: '0 0 1rem 0',
    color: 'var(--text)'
  },
  cardText: {
    margin: 0,
    color: 'var(--text-light)'
  }
}