import { useState } from 'preact/hooks'
import { useStore } from '../store'

export function Login({ navigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [passwordError, setPasswordError] = useState('')
  
  const { register, login, isLoading, error, clearError } = useStore() // Убрали demoLogin

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    setPasswordError('')

    if (!email.trim() || !password.trim()) {
      useStore.getState().clearError?.()
      return
    }

    if (isRegister) {
      if (!groupName.trim()) {
        useStore.getState().clearError?.()
        return
      }
      
      if (password !== confirmPassword) {
        setPasswordError('Пароли не совпадают')
        return
      }
      
      if (password.length < 6) {
        setPasswordError('Пароль должен быть не менее 6 символов')
        return
      }
    }

    try {
      if (isRegister) {
        await register(email, password, groupName)
      } else {
        await login(email, password)
      }
    } catch (err) {
      // Ошибка уже обработана в store
    }
  }

  const toggleRegisterMode = (value) => {
    setIsRegister(value)
    clearError()
    setPasswordError('')
    setConfirmPassword('')
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>PolyStats</h1>
          <p style={styles.subtitle}>Трекер твоего прогресса</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{isRegister ? 'Регистрация' : 'Вход'}</h2>
          <p style={styles.description}>
            {isRegister 
              ? 'Создайте аккаунт для отслеживания учебного прогресса'
              : 'Войдите для отслеживания учебного прогресса'}
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.ru"
                required
                disabled={isLoading}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Пароль</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                style={styles.input}
                minLength={6}
              />
              {isRegister && (
                <div style={styles.passwordHint}>
                  Не менее 6 символов
                </div>
              )}
            </div>
            
            {isRegister && (
              <div style={styles.formGroup}>
                <label htmlFor="confirmPassword" style={styles.label}>Подтвердите пароль</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  style={{
                    ...styles.input,
                    ...(passwordError && passwordError.includes('совпадают') ? styles.inputError : {})
                  }}
                  minLength={6}
                />
              </div>
            )}
            
            {passwordError && (
              <div style={styles.error}>
                {passwordError}
                <button 
                  onClick={() => setPasswordError('')}
                  style={styles.closeErrorBtn}
                  aria-label="Закрыть ошибку"
                >
                  ×
                </button>
              </div>
            )}
            
            {error && (
              <div style={styles.error}>
                {error}
                <button 
                  onClick={clearError}
                  style={styles.closeErrorBtn}
                  aria-label="Закрыть ошибку"
                >
                  ×
                </button>
              </div>
            )}

            {isRegister && (
              <div style={styles.formGroup}>
                <label htmlFor="groupName" style={styles.label}>Номер группы</label>
                <input
                  id="groupName"
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="5130904/30105"
                  required
                  disabled={isLoading}
                  style={styles.input}
                />
              </div>
            )}

            <button 
              type="submit" 
              style={{
                ...styles.primaryBtn,
                ...(isLoading ? styles.disabledBtn : {})
              }}
              disabled={isLoading}
            >
              {isLoading 
                ? (isRegister ? 'Регистрация...' : 'Вход...')
                : (isRegister ? 'Зарегистрироваться' : 'Войти')}
            </button>
          </form>

          <div style={styles.footer}>
            {isRegister ? (
              <p>Уже есть аккаунт? <button 
                onClick={() => toggleRegisterMode(false)}
                style={styles.linkButton}
                disabled={isLoading}
              >
                Войти
              </button></p>
            ) : (
              <p>Нет аккаунта? <button 
                onClick={() => toggleRegisterMode(true)}
                style={styles.linkButton}
                disabled={isLoading}
              >
                Зарегистрироваться
              </button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000000',
    padding: '1rem'
  },
  container: {
    maxWidth: '480px',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: 'white'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    fontWeight: '300'
  },
  subtitle: {
    fontSize: '1rem',
    opacity: 0.7
  },
  card: {
    background: '#111111',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    border: '1px solid #222222'
  },
  cardTitle: {
    marginBottom: '0.5rem',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '400'
  },
  description: {
    color: '#888888',
    marginBottom: '1.5rem',
    fontSize: '0.9rem'
  },
  form: {
    marginBottom: '1.5rem'
  },
  formGroup: {
    marginBottom: '1.25rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 400,
    color: 'white',
    fontSize: '0.9rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #333333',
    borderRadius: '8px',
    fontSize: '1rem',
    background: '#000000',
    color: 'white',
    transition: 'border-color 0.2s'
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: '2px'
  },
  passwordHint: {
    fontSize: '0.75rem',
    color: '#888888',
    marginTop: '0.25rem'
  },
  error: {
    background: 'rgba(255, 68, 68, 0.1)',
    color: '#ff4444',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    border: '1px solid rgba(255, 68, 68, 0.2)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeErrorBtn: {
    background: 'none',
    border: 'none',
    color: '#ff4444',
    fontSize: '1.25rem',
    cursor: 'pointer',
    padding: '0 0.25rem',
    opacity: 0.7
  },
  primaryBtn: {
    width: '100%',
    padding: '0.875rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '0.75rem',
    background: 'white',
    color: 'black'
  },
  disabledBtn: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#666666',
    fontSize: '0.875rem'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '0.875rem',
    padding: '0'
  }
}