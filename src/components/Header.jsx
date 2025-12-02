import { useState } from 'preact/hooks'
import { useStore } from '../store'

export default function Header() {
  const { isOnline, settings } = useStore()
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  
  const handleInstallClick = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt()
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Пользователь установил PWA')
        }
        window.deferredPrompt = null
        setShowInstallPrompt(false)
      })
    }
  }
  
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">📱 MyPWA</h1>
        <div className={`status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? '🟢 Онлайн' : '🔴 Офлайн'}
        </div>
      </div>
      
      <div className="header-right">
        {showInstallPrompt && (
          <button className="install-btn" onClick={handleInstallClick}>
            📲 Установить
          </button>
        )}
        <div className="theme-indicator">
          {settings.theme === 'light' ? '🌞' : '🌙'}
        </div>
      </div>
    </header>
  )
}