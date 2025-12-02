import { useState } from 'preact/hooks'
import { useStore, mockUsers } from '../store'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Имитация задержки сети
    setTimeout(() => {
      const userExists = mockUsers.find(
        user => user.email === email && user.password === password
      )

      if (!userExists) {
        setError('Неверный email или пароль')
        setLoading(false)
        return
      }

      login(email)
      setLoading(false)
    }, 500)
  }

  const handleDemoLogin = () => {
    login('student@university.ru')
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 StudentTracker</h1>
          <p style={styles.subtitle}>Самоотчетность для студентов</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Вход в систему</h2>
          <p style={styles.description}>
            Войдите, чтобы отслеживать прогресс по дисциплинам
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email университета</label>
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
              />
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button 
              type="submit" 
              style={styles.primaryBtn}
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <div style={styles.divider}>
            <span>или</span>
          </div>

          <button 
            onClick={handleDemoLogin}
            style={styles.secondaryBtn}
            disabled={loading}
          >
            🎓 Войти как демо-студент
          </button>

          <div style={styles.footer}>
            <p>Для демо-версии используйте:</p>
            <p style={styles.hint}>
              Email: student@university.ru<br />
              Пароль: 123456
            </p>
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: 0.9
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
  },
  cardTitle: {
    marginBottom: '0.5rem',
    color: '#333'
  },
  description: {
    color: '#666',
    marginBottom: '1.5rem'
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
    fontWeight: 500,
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s'
  },
  error: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.875rem'
  },
  primaryBtn: {
    width: '100%',
    padding: '0.875rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '0.75rem',
    background: '#4f46e5',
    color: 'white'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    color: '#6b7280'
  },
  secondaryBtn: {
    width: '100%',
    padding: '0.875rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '0.75rem',
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db'
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '0.875rem'
  },
  hint: {
    marginTop: '0.75rem',
    padding: '0.75rem',
    background: '#f3f4f6',
    borderRadius: '8px',
    fontSize: '0.75rem'
  }
}