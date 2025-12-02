import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'

// Инициализируем тему перед рендерингом
const initializeTheme = () => {
  // Проверяем сохраненную тему в localStorage
  const savedTheme = localStorage.getItem('student-tracker-storage')
  if (savedTheme) {
    try {
      const parsed = JSON.parse(savedTheme)
      if (parsed?.state?.settings?.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
    } catch (e) {
      console.error('Error parsing saved theme:', e)
    }
  }
  
  // Также проверяем системные настройки
  if (!localStorage.getItem('student-tracker-storage')) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }
}

// Вызываем инициализацию
initializeTheme()

// Рендерим приложение
render(<App />, document.getElementById('app'))