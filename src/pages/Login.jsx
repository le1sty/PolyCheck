import { useState } from 'preact/hooks'
import { useStore, mockUsers } from '../store'

export function Login({ navigate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [group, setGroup] = useState('it-101')
  const { login, register, getAllGroups } = useStore()
  
  const groups = getAllGroups()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      try {
        if (isRegister) {
          // Регистрация
          register(email, password, group)
        } else {
          // Вход
          const userExists = mockUsers.find(
            user => user.email === email && user.password === password
          )

          if (!userExists) {
            setError('Неверный email или пароль')
            setLoading(false)
            return
          }

          login(email)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  const handleDemoLogin = () => {
    login('student@university.ru')
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>PolyStats</h1>
          <p style={styles.subtitle}>Минималистичный трекер прогресса</p>
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
                disabled={loading}
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
                disabled={loading}
                style={styles.input}
                minLength={6}
              />
            </div>
            
            {isRegister && (
              <div style={styles.formGroup}>
                <label htmlFor="group" style={styles.label}>Группа</label>
                <select
                  id="group"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  required
                  disabled={loading}
                  style={styles.select}
                >
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {error && <div style={styles.error}>{error}</div>}

            <button 
              type="submit" 
              style={styles.primaryBtn}
              disabled={loading}
            >
              {loading 
                ? (isRegister ? 'Регистрация...' : 'Вход...')
                : (isRegister ? 'Зарегистрироваться' : 'Войти')}
            </button>
          </form>

          <div style={styles.divider}>
            <span>или</span>
          </div>

          {!isRegister && (
            <>
              <button 
                onClick={handleDemoLogin}
                style={styles.secondaryBtn}
                disabled={loading}
              >
                Войти как демо-пользователь
              </button>

              <div style={styles.footer}>
                <p>Нет аккаунта? <button 
                  onClick={() => setIsRegister(true)} 
                  style={styles.linkButton}
                  disabled={loading}
                >
                  Зарегистрироваться
                </button></p>
                
                <p style={styles.hint}>
                  Для демо-версии используйте:<br />
                  Email: student@university.ru<br />
                  Пароль: 123456
                </p>
              </div>
            </>
          )}
          
          {isRegister && (
            <div style={styles.footer}>
              <p>Уже есть аккаунт? <button 
                onClick={() => setIsRegister(false)} 
                style={styles.linkButton}
                disabled={loading}
              >
                Войти
              </button></p>
            </div>
          )}
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
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #333333',
    borderRadius: '8px',
    fontSize: '1rem',
    background: '#000000',
    color: 'white',
    transition: 'border-color 0.2s',
    appearance: 'none',
    WebkitAppearance: 'none'
  },
  error: {
    background: 'rgba(255, 68, 68, 0.1)',
    color: '#ff4444',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    border: '1px solid rgba(255, 68, 68, 0.2)'
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
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    color: '#666666'
  },
  secondaryBtn: {
    width: '100%',
    padding: '0.875rem',
    border: '1px solid #333333',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '0.75rem',
    background: 'transparent',
    color: 'white'
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
  },
  hint: {
    marginTop: '0.75rem',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    fontSize: '0.75rem',
    color: '#888888'
  }
}