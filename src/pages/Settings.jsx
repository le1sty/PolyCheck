import { useState } from 'preact/hooks'
import { useStore } from '../store'

export function Settings() {
  const { settings, toggleTheme } = useStore()
  const [version] = useState('1.0.0')

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button onClick={() => window.location.href = '/'} style={styles.backButton}>← Назад</button>
        <h1 style={styles.title}>⚙️ Настройки</h1>
      </div>
      
      <div style={styles.content}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Внешний вид</h3>
          
          <div style={styles.settingItem}>
            <div style={styles.settingInfo}>
              <span style={styles.settingLabel}>Тема</span>
              <span style={styles.settingValue}>
                {settings.theme === 'light' ? '🌞 Светлая' : '🌙 Тёмная'}
              </span>
            </div>
            <button onClick={toggleTheme} style={styles.toggleBtn}>
              Переключить
            </button>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>О приложении</h3>
          
          <div style={styles.aboutInfo}>
            <div style={styles.infoItem}>
              <span>Версия</span>
              <span style={styles.infoValue}>{version}</span>
            </div>
            <div style={styles.infoItem}>
              <span>Тип</span>
              <span style={styles.infoValue}>PWA (Progressive Web App)</span>
            </div>
            <div style={styles.infoItem}>
              <span>Фронтенд</span>
              <span style={styles.infoValue}>Preact + Vite</span>
            </div>
            <div style={styles.infoItem}>
              <span>Состояние</span>
              <span style={styles.infoValue}>Zustand + LocalStorage</span>
            </div>
          </div>
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
    padding: '1.5rem',
    boxShadow: 'var(--shadow)',
    marginBottom: '1rem'
  },
  cardTitle: {
    margin: '0 0 1rem 0',
    color: 'var(--primary)',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid var(--border)'
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderBottom: '1px solid var(--border)'
  },
  settingItemLast: {
    borderBottom: 'none'
  },
  settingInfo: {
    flex: 1
  },
  settingLabel: {
    display: 'block',
    fontWeight: 500,
    marginBottom: '0.25rem'
  },
  settingValue: {
    fontSize: '0.875rem',
    color: 'var(--text-light)'
  },
  toggleBtn: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    cursor: 'pointer',
    background: 'var(--primary)',
    color: 'white'
  },
  aboutInfo: {
    marginTop: '1rem'
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 0',
    borderBottom: '1px solid var(--border)'
  },
  infoValue: {
    color: 'var(--primary)',
    fontWeight: 500
  }
}