import { useStore } from '../store'

export function Profile({ navigate }) {
  const { user, logout, toggleTheme, settings } = useStore()
  
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  }
  
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Профиль</h1>
      </div>
      
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.profileHeader}>
            <div style={styles.profileInfo}>
              <h2 style={styles.userName}>{user?.name}</h2>
              <div style={styles.emailSection}>
                <span style={styles.emailLabel}>Email:</span>
                <span style={styles.emailValue}>{user?.email}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Группа:</span>
                <span style={styles.infoValue}>
                  {user?.groupName || 'ИТ-101'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Внешний вид</h3>
          
          <div style={styles.settingItem}>
            <div style={styles.settingInfo}>
              <span style={styles.settingLabel}>Тема</span>
              <span style={styles.settingValue}>
                {settings.theme === 'dark' ? 'Тёмная' : 'Светлая'}
              </span>
            </div>
            <button onClick={toggleTheme} style={styles.toggleBtn}>
              Сменить
            </button>
          </div>
        </div>
        
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: 'calc(100vh - 70px)',
    paddingBottom: '1rem'
  },
  header: {
    padding: '1rem',
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface)'
  },
  title: {
    margin: '0.5rem 0',
    color: 'var(--text)',
    fontSize: '1.3rem',
    fontWeight: '400'
  },
  content: {
    padding: '1rem'
  },
  card: {
    background: 'var(--surface)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    border: '1px solid var(--border)'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  profileInfo: {
    flex: 1
  },
  userName: {
    margin: '0 0 1rem 0',
    color: 'var(--text)',
    fontSize: '1.2rem',
    fontWeight: '400'
  },
  emailSection: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border)'
  },
  emailLabel: {
    display: 'block',
    color: 'var(--text-light)',
    fontSize: '0.9rem',
    marginBottom: '0.25rem'
  },
  emailValue: {
    display: 'block',
    color: 'var(--text)',
    fontSize: '1rem',
    fontFamily: 'monospace'
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid var(--border)'
  },
  infoLabel: {
    color: 'var(--text-light)',
    fontSize: '0.9rem'
  },
  infoValue: {
    color: 'var(--text)',
    fontWeight: '500'
  },
  sectionTitle: {
    margin: '0 0 1rem 0',
    color: 'var(--text)',
    fontSize: '1rem',
    fontWeight: '500'
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderBottom: '1px solid var(--border)'
  },
  settingInfo: {
    flex: 1
  },
  settingLabel: {
    display: 'block',
    fontWeight: 400,
    marginBottom: '0.25rem',
    color: 'var(--text)'
  },
  settingValue: {
    fontSize: '0.875rem',
    color: 'var(--text-light)'
  },
  toggleBtn: {
    padding: '0.5rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    fontSize: '0.875rem',
    cursor: 'pointer',
    background: 'var(--surface)',
    color: 'var(--text)',
    transition: 'all 0.2s'
  },
  logoutBtn: {
    width: '100%',
    background: 'rgba(255, 68, 68, 0.1)',
    color: '#ff4444',
    border: '1px solid rgba(255, 68, 68, 0.2)',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem'
  }
}