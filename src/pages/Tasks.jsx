import { useState } from 'preact/hooks'
import { useStore } from '../store'
import TaskItem from '../components/TaskItem'

export function Tasks() {
  const { tasks, addTask } = useStore()
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      addTask(newTask)
      setNewTask('')
    }
  }
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })
  
  const completedCount = tasks.filter(t => t.completed).length
  const activeCount = tasks.length - completedCount
  
  return (
    <div className="page tasks">
      <div className="page-header">
        <h2>Мои задачи</h2>
        <div className="task-stats">
          <span>{activeCount} активных</span>
          <span>{completedCount} выполнено</span>
        </div>
      </div>
      
      <div className="card">
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Что нужно сделать?"
            className="task-input"
          />
          <button type="submit" className="btn primary">
            Добавить
          </button>
        </form>
      </div>
      
      <div className="card">
        <div className="filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Все ({tasks.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Активные ({activeCount})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Выполненные ({completedCount})
          </button>
        </div>
        
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>Нет задач</p>
              <p className="hint">
                {filter === 'completed' 
                  ? 'Вы еще не выполнили ни одной задачи'
                  : filter === 'active'
                  ? 'Все задачи выполнены! 🎉'
                  : 'Добавьте первую задачу'
                }
              </p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
      
      {tasks.length > 0 && (
        <div className="card">
          <h3>Прогресс</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">
            Выполнено {completedCount} из {tasks.length} задач
          </p>
        </div>
      )}
    </div>
  )
}