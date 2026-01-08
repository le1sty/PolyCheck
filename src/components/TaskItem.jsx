import { useState, useRef } from 'preact/hooks'
import { useStore } from '../store'

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useStore()
  const [isSwiping, setIsSwiping] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
    setIsSwiping(true)
  }
  
  const handleTouchMove = (e) => {
    if (!isSwiping) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartX.current
    const deltaY = Math.abs(touch.clientY - touchStartY.current)
    
    // Проверяем, что это горизонтальный свайп (не вертикальный)
    if (deltaY > 30) {
      setIsSwiping(false)
      setTranslateX(0)
      return
    }
    
    // Ограничиваем свайп вправо и задаем максимальный свайп влево
    let newTranslateX = Math.min(Math.max(deltaX, -120), 20)
    
    // Делаем свайп влево более "тяжелым"
    if (newTranslateX < 0) {
      newTranslateX = newTranslateX * 0.7
    }
    
    setTranslateX(newTranslateX)
  }
  
  const handleTouchEnd = () => {
    setIsSwiping(false)
    
    // Если свайпнули достаточно далеко влево, показываем подтверждение удаления
    if (translateX < -80) {
      setTranslateX(0)
      if (confirm(`Удалить задачу "${task.title}"?`)) {
        deleteTask(task.id)
      }
    } else {
      // Иначе возвращаем на место
      setTranslateX(0)
    }
  }
  
  const handleCheckboxClick = (e) => {
    e.stopPropagation()
    toggleTask(task.id)
  }
  
  const typeNames = {
    homework: 'Домашнее задание',
    lab: 'Лабораторная работа',
    project: 'Проект',
    test: 'Контрольная работа',
    lecture: 'Лекция'
  }
  
  return (
    <div
      style={{
        ...styles.taskWrapper,
        transform: `translateX(${translateX}px)`,
        transition: isSwiping ? 'none' : 'transform 0.3s ease',
        backgroundColor: translateX < -60 ? 'rgba(255, 68, 68, 0.1)' : 'transparent',
        borderLeft: translateX < -60 ? '3px solid #ff4444' : 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => toggleTask(task.id)}
    >
      <div style={styles.taskItem}>
        <div style={styles.taskContent}>
          <div 
            style={{
              ...styles.checkbox,
              ...(task.completed ? styles.checkboxCompleted : {})
            }}
            onClick={handleCheckboxClick}
            aria-label={task.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
          >
            {task.completed && '✓'}
          </div>
          
          <div style={styles.taskDetails}>
            <h4 style={styles.taskTitle}>{task.title}</h4>
            <div style={styles.taskMeta}>
              <span style={styles.taskType}>
                {typeNames[task.type] || task.type}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Индикатор удаления при свайпе */}
      {translateX < -50 && (
        <div style={styles.deleteIndicator}>
          <div style={styles.deleteText}>Отпустите для удаления</div>
        </div>
      )}
    </div>
  )
}

const styles = {
  taskWrapper: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-left 0.2s',
    marginBottom: '0.75rem'
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    background: 'var(--surface)',
    borderRadius: '8px',
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
    justifyContent: 'center',
    flexShrink: 0
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
  deleteIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.9)',
    zIndex: 10,
    pointerEvents: 'none',
    borderRadius: '8px'
  },
  deleteText: {
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '500',
    textAlign: 'center',
    padding: '0 1rem'
  }
}