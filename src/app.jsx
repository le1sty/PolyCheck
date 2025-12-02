import { useState, useEffect } from 'preact/hooks'
import Router from 'preact-router'
import { Home } from './pages/Home'
import { Tasks } from './pages/Tasks'
import { Profile } from './pages/Profile'
import { Stats } from './pages/Stats'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import { useStore } from './store'
import './index.css'

export function App() {
  const { setOnlineStatus } = useStore()
  
  useEffect(() => {
    // Отслеживаем онлайн статус
    const handleOnline = () => {
      setOnlineStatus(true)
      console.log('Приложение онлайн')
    }
    
    const handleOffline = () => {
      setOnlineStatus(false)
      console.log('Приложение офлайн')
    }
    
    // Отслеживаем установку PWA
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      window.deferredPrompt = e
      console.log('PWA может быть установлено')
    }
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    
    // Регистрация Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker зарегистрирован:', reg))
        .catch(err => console.log('Ошибка регистрации SW:', err))
    }
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [setOnlineStatus])
  
  return (
    <div className="app">
      <Header />
      
      <main className="main">
        <Router>
          <Home path="/" />
          <Tasks path="/tasks" />
          <Profile path="/profile" />
          <Stats path="/stats" />
        </Router>
      </main>
      
      <BottomNav />
      
      {/* Уведомление для офлайн режима */}
      <div className="offline-notification" id="offline-notice">
        ⚠️ Вы сейчас офлайн. Данные сохранены локально.
      </div>
    </div>
  )
}