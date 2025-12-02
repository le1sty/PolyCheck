import { useState } from 'preact/hooks'
import { useStore } from '../store'

export function Profile() {
  const { user, logout } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(user?.name || '')
  
  const handleSave = () => {
    // В демо-версии просто сохраняем в localStorage
    localStorage.setItem('userName', editName)
    setIsEditing(false)
    window.location.reload()
  }
  
  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }
  
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button onClick={() => window.location.href = '/'} style={styles.backButton}>← Назад</button>
        <h1 style={styles.title}>Профиль</h1>
      </div>
      
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.profileHeader}>
            <img src={user?.avatar} alt="Аватар" style={styles.profileAvatar} />
            <div style={styles.profileInfo}>
              {isEditing ? (
                <div style={styles.editForm}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={styles.nameInput}
                    placeholder="Ваше имя"
                  />
                  <div style={styles.editButtons}>
                    <button onClick={handleSave} style={styles.saveBtn}>Сохранить</button>
                    <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Отмена</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 style={styles.userName}>{user?.name}</h2>
                  <p style={styles.userEmail}>{user?.email}</p>
                  <button 
                    onClick={() => setIsEditing(true)}
                    style={styles.editBtn}
                  >
                    ✏️ Редактировать
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        <button onClick={handleLogout} style={styles.logoutBtn}>
          🚪 Выйти из аккаунта
        </button>
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
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  profileAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '3px solid var(--primary)'
  },
  profileInfo: {
    flex: 1
  },
  userName: {
    margin: '0 0 0.25rem 0',
    color: 'var(--text)'
  },
  userEmail: {
    margin: '0 0 1rem 0',
    color: 'var(--text-light)'
  },
  editBtn: {
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    color: 'var(--text)'
  },
  editForm: {
    marginTop: '1rem'
  },
  nameInput: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '1rem'
  },
  editButtons: {
    display: 'flex',
    gap: '0.5rem'
  },
  saveBtn: {
    flex: 1,
    background: 'var(--success)',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  cancelBtn: {
    flex: 1,
    background: 'var(--danger)',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  logoutBtn: {
    width: '100%',
    background: 'var(--danger)',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer'
  }
}