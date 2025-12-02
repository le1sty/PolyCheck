import { useEffect, useState } from 'preact/hooks'
import { useStore } from './store'
import { Login } from './pages/Login'
import { GroupSelect } from './pages/GroupSelect'
import { Home } from './pages/Home'
import { DisciplinePage } from './pages/DisciplinePage'
import { Stats } from './pages/Stats'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import BottomNav from './components/BottomNav'
import './index.css'

export function App() {
  const { user, setOnlineStatus } = useStore()
  const [currentPage, setCurrentPage] = useState('home')
  const [disciplineId, setDisciplineId] = useState('')
  
  // Навигация
  const navigate = (page, id = '') => {
    console.log('Navigating to:', page, 'with id:', id)
    
    setCurrentPage(page)
    if (id) {
      setDisciplineId(id)
    }
    
    // Обновляем URL без перезагрузки
    let path = '/'
    if (page === 'discipline' && id) {
      path = `/discipline/${id}`
    } else if (page !== 'home') {
      path = `/${page}`
    }
    
    window.history.pushState({}, '', path)
  }
  
  // Обработка браузерной навигации
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      console.log('PopState path:', path)
      
      if (path.includes('/discipline/')) {
        const id = path.split('/discipline/')[1]
        console.log('Setting discipline page with ID:', id)
        setCurrentPage('discipline')
        setDisciplineId(id)
      } else if (path === '/stats') {
        setCurrentPage('stats')
      } else if (path === '/profile') {
        setCurrentPage('profile')
      } else if (path === '/settings') {
        setCurrentPage('settings')
      } else if (path === '/group-select') {
        setCurrentPage('group-select')
      } else if (path === '/login') {
        setCurrentPage('login')
      } else {
        setCurrentPage('home')
      }
    }
    
    window.addEventListener('popstate', handlePopState)
    
    // Проверяем начальный URL
    const initialPath = window.location.pathname
    console.log('Initial path:', initialPath)
    
    if (initialPath.includes('/discipline/')) {
      const id = initialPath.split('/discipline/')[1]
      setCurrentPage('discipline')
      setDisciplineId(id)
    } else if (initialPath === '/stats') {
      setCurrentPage('stats')
    } else if (initialPath === '/profile') {
      setCurrentPage('profile')
    } else if (initialPath === '/settings') {
      setCurrentPage('settings')
    } else if (initialPath === '/group-select') {
      setCurrentPage('group-select')
    }
    
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  
  // Сервис воркер и онлайн статус
  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true)
    const handleOffline = () => setOnlineStatus(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .catch(err => console.log('Ошибка SW:', err))
    }
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnlineStatus])
  
  // Если пользователь не авторизован
  if (!user) {
    if (currentPage === 'group-select') {
      return <GroupSelect navigate={navigate} />
    }
    return <Login navigate={navigate} />
  }
  
  // Если пользователь авторизован, но не выбрал группу
  if (user && !user.groupId) {
    return <GroupSelect navigate={navigate} />
  }
  
  // Рендерим текущую страницу
  const renderPage = () => {
    console.log('Rendering page:', currentPage, 'disciplineId:', disciplineId)
    
    switch (currentPage) {
      case 'discipline':
        return disciplineId ? <DisciplinePage disciplineId={disciplineId} navigate={navigate} /> : <Home navigate={navigate} />
      case 'stats':
        return <Stats navigate={navigate} />
      case 'profile':
        return <Profile navigate={navigate} />
      case 'settings':
        return <Settings navigate={navigate} />
      case 'group-select':
        return <GroupSelect navigate={navigate} />
      default:
        return <Home navigate={navigate} />
    }
  }
  
  return (
    <div class="app">
      <main class="main">
        {renderPage()}
      </main>
      {currentPage !== 'login' && currentPage !== 'group-select' && (
        <BottomNav navigate={navigate} currentPage={currentPage} />
      )}
    </div>
  )
}