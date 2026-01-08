import { useEffect, useState } from 'preact/hooks'
import { useStore } from './store'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { DisciplinePage } from './pages/DisciplinePage'
import { Profile } from './pages/Profile'
import BottomNav from './components/BottomNav'
import './index.css'

export function App() {
  const { user, setOnlineStatus } = useStore()
  const [currentPage, setCurrentPage] = useState('home')
  const [disciplineId, setDisciplineId] = useState('')
  
  const navigate = (page, id = '') => {
    setCurrentPage(page)
    if (id) {
      setDisciplineId(id)
    }
    
    let path = '/'
    if (page === 'discipline' && id) {
      path = `/discipline/${id}`
    } else if (page !== 'home') {
      path = `/${page}`
    }
    
    window.history.pushState({}, '', path)
  }
  
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      
      if (path.includes('/discipline/')) {
        const id = path.split('/discipline/')[1]
        setCurrentPage('discipline')
        setDisciplineId(id)
      } else if (path === '/profile') {
        setCurrentPage('profile')
      } else if (path === '/login') {
        setCurrentPage('login')
      } else {
        setCurrentPage('home')
      }
    }
    
    window.addEventListener('popstate', handlePopState)
    
    const initialPath = window.location.pathname
    
    if (initialPath.includes('/discipline/')) {
      const id = initialPath.split('/discipline/')[1]
      setCurrentPage('discipline')
      setDisciplineId(id)
    } else if (initialPath === '/profile') {
      setCurrentPage('profile')
    } else if (initialPath === '/login') {
      setCurrentPage('login')
    }
    
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  
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
  
  if (!user) {
    return <Login navigate={navigate} />
  }
  
  const renderPage = () => {
    switch (currentPage) {
      case 'discipline':
        return disciplineId ? <DisciplinePage disciplineId={disciplineId} navigate={navigate} /> : <Home navigate={navigate} />
      case 'profile':
        return <Profile navigate={navigate} />
      default:
        return <Home navigate={navigate} />
    }
  }
  
  return (
    <div class="app">
      <div class="scrollable-content">
        {renderPage()}
      </div>
      {currentPage !== 'login' && (
        <div class="fixed-bottom">
          <BottomNav navigate={navigate} currentPage={currentPage} />
        </div>
      )}
    </div>
  )
}