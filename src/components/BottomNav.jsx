export default function BottomNav({ navigate, currentPage }) {
  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'profile', label: 'Профиль' }
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
    position: 'relative',
    zIndex: 10
  },
  navItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-light)',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderRadius: '4px'
  },
  navItemActive: {
    color: 'var(--primary)',
    background: 'var(--background)'
  },
  navLabel: {
    fontSize: '0.7rem',
    fontWeight: 400
  }
}