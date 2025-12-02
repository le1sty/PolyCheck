import { useState } from 'preact/hooks'
import { useStore } from '../store'

export function Profile() {
  const { user, settings, updateUser, toggleTheme, toggleNotifications } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(user.name)
  const [editEmail, setEditEmail] = useState(user.email)
  
  const handleSave = () => {
    updateUser({ name: editName, email: editEmail })
    setIsEditing(false)
  }
  
  return (
    <div className="page profile">
      <div className="card profile-card">
        <div className="avatar-section">
          <img src={user.avatar} alt="Аватар" className="avatar" />
          <div className="avatar-badge">👨‍🎓</div>
        </div>
        
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="input"
              placeholder="Имя"
            />
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="input"
              placeholder="Email"
            />
            <div className="button-group">
              <button onClick={handleSave} className="btn primary">
                Сохранить
              </button>
              <button onClick={() => setIsEditing(false)} className="btn secondary">
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2>{user.name}</h2>
            <p className="email">{user.email}</p>
            <p className="role">Студент разработки</p>
            <button onClick={() => setIsEditing(true)} className="btn outline">
              ✏️ Редактировать профиль
            </button>
          </>
        )}
      </div>
      
      <div className="card">
        <h3>Настройки</h3>
        
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Тема</span>
            <span className="setting-value">
              {settings.theme === 'light' ? 'Светлая' : 'Тёмная'}
            </span>
          </div>
          <button onClick={toggleTheme} className="toggle-btn">
            {settings.theme === 'light' ? '🌙' : '🌞'}
          </button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Уведомления</span>
            <span className="setting-value">
              {settings.notifications ? 'Включены' : 'Выключены'}
            </span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={toggleNotifications}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Очистить данные</span>
            <span className="setting-value">Удалить все задачи</span>
          </div>
          <button className="btn danger">🗑️</button>
        </div>
      </div>
      
      <div className="card">
        <h3>Информация о приложении</h3>
        <div className="app-info">
          <div className="info-item">
            <span>Версия</span>
            <span className="value">1.0.0</span>
          </div>
          <div className="info-item">
            <span>Тип</span>
            <span className="value">PWA (Progressive Web App)</span>
          </div>
          <div className="info-item">
            <span>Фронтенд</span>
            <span className="value">Preact + Vite</span>
          </div>
          <div className="info-item">
            <span>Бэкенд</span>
            <span className="value">FastAPI (скоро)</span>
          </div>
          <div className="info-item">
            <span>Офлайн-режим</span>
            <span className="value">✅ Поддерживается</span>
          </div>
        </div>
      </div>
    </div>
  )
}