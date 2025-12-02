import { useState } from 'preact/hooks'
import { useStore } from '../store'

export function Home() {
  const { tasks, addTask } = useStore()
  const [newTask, setNewTask] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      addTask(newTask)
      setNewTask('')
    }
  }
  
  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length
  
  return (
    <div className="page home">
      <div className="welcome-card">
        <h2>Добро пожаловать! 👋</h2>
        <p>Это учебный проект PWA на Preact</p>
        <div className="stats">
          <div className="stat">
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">Всего задач</span>
          </div>
          <div className="stat">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Выполнено</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
            </span>
            <span className="stat-label">Прогресс</span>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3>Быстрое добавление задачи</h3>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Введите новую задачу..."
            className="task-input"
          />
          <button type="submit" className="btn primary">
            Добавить
          </button>
        </form>
      </div>
      
      <div className="card">
        <h3>Последние задачи</h3>
        {tasks.slice(0, 3).map(task => (
          <div key={task.id} className="quick-task">
            <span className={task.completed ? 'completed' : ''}>
              {task.completed ? '✅' : '⏳'} {task.text}
            </span>
          </div>
        ))}
      </div>
      
      <div className="card">
        <h3>Инструкция по PWA</h3>
        <ul className="instructions">
          <li>📱 Откройте в Chrome на Android</li>
          <li>⋮ Нажмите на меню (три точки)</li>
          <li>📲 Выберите "Установить приложение"</li>
          <li>🎉 Готово! Приложение появится на рабочем столе</li>
        </ul>
      </div>
    </div>
  )
}