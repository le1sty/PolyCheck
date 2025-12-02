import { useState } from 'preact/hooks'
import { useStore } from '../store'

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useStore()
  const [showConfirm, setShowConfirm] = useState(false)
  
  const typeIcons = {
    homework: '📝',
    lab: '🔬',
    project: '🏗️',
    test: '📋',
    lecture: '🎓'
  }
  
  const typeNames = {
    homework: 'Домашнее задание',
    lab: 'Лабораторная работа',
    project: 'Проект',
    test: 'Контрольная работа',
    lecture: 'Лекция'
  }
  
  return (
    <div style={{
      ...styles.taskItem,
      ...(task.completed ? styles.taskCompleted : {})
    }}>
      <div style={styles.taskContent}>
        <button 
          onClick={() => toggleTask(task.id)}
          style={{
            ...styles.checkbox,
            ...(task.completed ? styles.checkboxCompleted : {})
          }}
          aria-label={task.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
        >
          {task.completed && '✓'}
        </button>
        
        <div style={styles.taskDetails}>
          <h4 style={styles.taskTitle}>{task.title}</h4>
          <div style={styles.taskMeta}>
            <span style={styles.taskType}>
              <span>{typeIcons[task.type] || '📌'}</span>
              <span>{typeNames[task.type] || task.type}</span>
            </span>
          </div>
        </div>
      </div>
      
      <div style={styles.taskActions}>
        <button 
          onClick={() => {
            if (showConfirm) {
              deleteTask(task.id)
              setShowConfirm(false)
            } else {
              setShowConfirm(true)
              setTimeout(() => setShowConfirm(false), 3000)
            }
          }}
          style={styles.deleteBtn}
        >
          {showConfirm ? 'Точно?' : '🗑️'}
        </button>
      </div>
    </div>
  )
}

const styles = {
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    background: 'var(--surface)',
    borderRadius: '8px',
    marginBottom: '0.75rem',
    boxShadow: 'var(--shadow)'
  },
  taskCompleted: {
    opacity: 0.7
  },
  taskContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1
  },
  checkbox: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid var(--primary)',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxCompleted: {
    background: 'var(--primary)',
    color: 'white'
  },
  taskDetails: {
    flex: 1
  },
  taskTitle: {
    margin: '0 0 0.25rem 0',
    color: 'var(--text)'
  },
  taskMeta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.875rem',
    color: 'var(--text-light)'
  },
  taskType: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  taskActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    cursor: 'pointer',
    fontSize: '1.25rem',
    padding: '0.25rem'
  }
}