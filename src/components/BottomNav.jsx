import { Link } from 'preact-router/match'

export default function BottomNav() {
  const navItems = [
    { path: '/', icon: '🏠', label: 'Главная' },
    { path: '/tasks', icon: '✅', label: 'Задачи' },
    { path: '/profile', icon: '👤', label: 'Профиль' },
    { path: '/stats', icon: '📊', label: 'Статистика' }
  ]
  
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          activeClassName="active"
          className="nav-item"
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}