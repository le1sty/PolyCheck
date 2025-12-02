export default function BottomNav({ navigate, currentPage }) {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Главная' },
    { id: 'stats', icon: '📊', label: 'Статистика' },
    { id: 'profile', icon: '👤', label: 'Профиль' },
    { id: 'settings', icon: '⚙️', label: 'Настройки' }
  ]
  
  return (
    <nav style={styles.nav}>
      {navItems.map(item => (
        <button
          key={item.id}
          style={{
            ...styles.navItem,
            ...(currentPage === item.id ? styles.navItemActive : {})
          }}
          onClick={() => navigate(item.id)}
          aria-label={item.label}
        >
          <span style={styles.navIcon}>{item.icon}</span>
          <span style={styles.navLabel}>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

const styles = {
  nav: {
    background: 'var(--surface)',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    padding: '0.5rem',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 10
  },
  navItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-light)',
    fontSize: '0.75rem',
    gap: '0.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderRadius: '8px',
    minHeight: '60px'
  },
  navItemActive: {
    color: 'var(--primary)',
    background: 'var(--background)'
  },
  navIcon: {
    fontSize: '1.25rem',
    transition: 'transform 0.2s'
  },
  navLabel: {
    fontSize: '0.625rem',
    fontWeight: 500
  }
}