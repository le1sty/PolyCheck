import { useState, useEffect } from 'preact/hooks'
import { useStore } from '../store'
import TaskItem from '../components/TaskItem'

export function DisciplinePage({ disciplineId, navigate }) {
  const { getDisciplineById, addTask } = useStore()
  
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskType, setNewTaskType] = useState('homework')
  const [showAddForm, setShowAddForm] = useState(false)
  
  const discipline = getDisciplineById(disciplineId)
  
  if (!discipline) {
    return (
      <div style={styles.notFound}>
        <div style={styles.notFoundIcon}>📚</div>
        <h2 style={styles.notFoundTitle}>Дисциплина не найдена</h2>
        <p style={styles.notFoundText}>ID дисциплины: {disciplineId}</p>
        <button 
          onClick={() => navigate('home')}
          style={styles.backButton}
        >
          На главную
        </button>
      </div>
    )
  }
  
  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    
    addTask(discipline.id, newTaskTitle.trim(), newTaskType)
    setNewTaskTitle('')
    setShowAddForm(false)
  }
  
  const taskTypes = [
    { value: 'homework', label: '📝 Домашнее задание', color: '#3b82f6' },
    { value: 'lab', label: '🔬 Лабораторная работа', color: '#10b981' },
    { value: 'project', label: '🏗️ Проект', color: '#8b5cf6' },
    { value: 'test', label: '📋 Контрольная работа', color: '#ef4444' },
    { value: 'lecture', label: '🎓 Лекция', color: '#f59e0b' }
  ]
  
  return (
    <div style={styles.page}>
      {/* Шапка */}
      <div style={{ ...styles.header, backgroundColor: discipline.color }}>
        <button 
          onClick={() => navigate('home')}
          style={styles.backButton}
        >
          ← Назад
        </button>
        
        <div style={styles.headerContent}>
          <h1 style={styles.title}>{discipline.name}</h1>
        </div>
        
        <div style={styles.headerStats}>
          <div style={styles.headerStat}>
            <span style={styles.statValue}>{discipline.completedCount}/{discipline.totalCount}</span>
            <span style={styles.statLabel}>Задач выполнено</span>
          </div>
          <div style={styles.headerStat}>
            <span style={styles.statValue}>{discipline.progress}%</span>
            <span style={styles.statLabel}>Прогресс</span>
          </div>
        </div>
      </div>
      
      <div style={styles.content}>
        {/* Прогресс бар */}
        <div style={styles.progressSection}>
          <div style={styles.progressBarLarge}>
            <div 
              style={{
                ...styles.progressFillLarge,
                width: `${discipline.progress}%`,
                backgroundColor: discipline.color
              }}
            ></div>
          </div>
          <div style={styles.progressInfo}>
            <span style={styles.progressLabel}>Прогресс выполнения</span>
            <span style={styles.progressPercent}>{discipline.progress}%</span>
          </div>
        </div>
        
        {/* Форма добавления задачи */}
        <div style={styles.addTaskSection}>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            style={styles.addTaskToggle}
          >
            {showAddForm ? '✕ Отменить' : '+ Добавить новую задачу'}
          </button>
          
          {showAddForm && (
            <form onSubmit={handleAddTask} style={styles.addTaskForm}>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Название задачи"
                  style={styles.taskInput}
                  autoFocus
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Тип задачи:</label>
                <div style={styles.typeButtons}>
                  {taskTypes.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      style={{
                        ...styles.typeButton,
                        ...(newTaskType === type.value ? styles.typeButtonSelected : {})
                      }}
                      onClick={() => setNewTaskType(type.value)}
                    >
                      <span style={styles.typeIcon}>{type.label.split(' ')[0]}</span>
                      <span style={styles.typeText}>{type.label.split(' ').slice(1).join(' ')}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                type="submit" 
                style={styles.submitButton}
                disabled={!newTaskTitle.trim()}
              >
                Добавить задачу
              </button>
            </form>
          )}
        </div>
        
        {/* Список задач */}
        <div style={styles.tasksSection}>
          {discipline.tasks.length === 0 ? (
            <div style={styles.emptyTasks}>
              <div style={styles.emptyIcon}>📝</div>
              <h3 style={styles.emptyTitle}>Нет задач</h3>
              <p style={styles.emptyText}>Добавьте первую задачу для этой дисциплины</p>
            </div>
          ) : (
            discipline.tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    paddingBottom: '5rem',
    minHeight: '100vh',
    backgroundColor: 'var(--background)'
  },
  header: {
    color: 'white',
    padding: '1rem',
    marginBottom: '1rem'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '0.5rem 0',
    marginBottom: '0.5rem'
  },
  headerContent: {
    marginBottom: '1rem'
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.3rem',
    fontWeight: '600'
  },
  headerStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem'
  },
  headerStat: {
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '0.75rem 0.5rem',
    backdropFilter: 'blur(10px)'
  },
  statValue: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem'
  },
  statLabel: {
    display: 'block',
    fontSize: '0.75rem',
    opacity: 0.9
  },
  content: {
    padding: '0.75rem'
  },
  progressSection: {
    marginBottom: '1.5rem',
    background: 'var(--surface)',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: 'var(--shadow)'
  },
  progressBarLarge: {
    height: '8px',
    background: 'var(--border)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFillLarge: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875rem'
  },
  progressLabel: {
    color: 'var(--text-light)'
  },
  progressPercent: {
    color: 'var(--primary)',
    fontWeight: '600'
  },
  addTaskSection: {
    marginBottom: '1.5rem'
  },
  addTaskToggle: {
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    padding: '0.875rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    cursor: 'pointer',
    width: '100%',
    fontWeight: '500'
  },
  addTaskForm: {
    marginTop: '1rem',
    padding: '1.25rem',
    background: 'var(--surface)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)'
  },
  formGroup: {
    marginBottom: '1.25rem'
  },
  taskInput: {
    width: '100%',
    padding: '0.875rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    backgroundColor: 'var(--background)',
    color: 'var(--text)'
  },
  label: {
    display: 'block',
    marginBottom: '0.75rem',
    fontWeight: 500,
    color: 'var(--text)',
    fontSize: '0.95rem'
  },
  typeButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem'
  },
  typeButton: {
    padding: '0.75rem 0.5rem',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    background: 'var(--background)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    transition: 'all 0.2s'
  },
  typeButtonSelected: {
    borderColor: 'var(--primary)',
    background: 'var(--primary-light)'
  },
  typeIcon: {
    fontSize: '1.25rem'
  },
  typeText: {
    fontSize: '0.8rem',
    textAlign: 'center',
    lineHeight: '1.2'
  },
  submitButton: {
    background: 'var(--success)',
    color: 'white',
    border: 'none',
    padding: '0.875rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    cursor: 'pointer',
    width: '100%',
    fontWeight: '500'
  },
  tasksSection: {
    marginTop: '1.5rem'
  },
  emptyTasks: {
    textAlign: 'center',
    padding: '2rem 1rem',
    background: 'var(--surface)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)'
  },
  emptyIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: 'var(--text-light)'
  },
  emptyTitle: {
    margin: '0 0 0.5rem 0',
    color: 'var(--text)',
    fontSize: '1.1rem'
  },
  emptyText: {
    margin: 0,
    color: 'var(--text-light)',
    fontSize: '0.9rem'
  },
  notFound: {
    padding: '3rem 1rem',
    textAlign: 'center',
    background: 'var(--surface)',
    borderRadius: '12px',
    margin: '1rem',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notFoundIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: 'var(--text-light)'
  },
  notFoundTitle: {
    margin: '0 0 0.75rem 0',
    color: 'var(--text)',
    fontSize: '1.2rem'
  },
  notFoundText: {
    color: 'var(--text-light)',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  }
}