import { useState, useRef } from 'preact/hooks'
import DisciplineCard from './DisciplineCard'

export function SwipeableDisciplineCard({ discipline, onClick, onDelete, isDeleting = false }) {
  const [isSwiping, setIsSwiping] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  
  const handleTouchStart = (e) => {
    if (isDeleting) return;
    
    const touch = e.touches[0]
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
    setIsSwiping(true)
  }
  
  const handleTouchMove = (e) => {
    if (!isSwiping || isDeleting) return
    
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
    let newTranslateX = Math.min(Math.max(deltaX, -150), 20)
    
    // Делаем свайп влево более "тяжелым"
    if (newTranslateX < 0) {
      newTranslateX = newTranslateX * 0.7
    }
    
    setTranslateX(newTranslateX)
  }
  
  const handleTouchEnd = () => {
    if (isDeleting) return;
    
    setIsSwiping(false)
    
    // Если свайпнули достаточно далеко влево, вызываем onDelete
    if (translateX < -100) {
      setTranslateX(0)
      onDelete(discipline.id)
    } else {
      // Иначе возвращаем на место
      setTranslateX(0)
    }
  }
  
  const handleClick = () => {
    if (isDeleting) return;
    onClick()
  }
  
  return (
    <div
      style={{
        ...styles.cardWrapper,
        transform: `translateX(${translateX}px)`,
        transition: isSwiping ? 'none' : 'transform 0.3s ease',
        backgroundColor: translateX < -80 ? 'rgba(255, 68, 68, 0.1)' : 'transparent',
        borderLeft: translateX < -80 ? '4px solid #ff4444' : 'none',
        opacity: isDeleting ? 0.7 : 1,
        pointerEvents: isDeleting ? 'none' : 'auto'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      <DisciplineCard discipline={discipline} />
      
      {/* Индикатор удаления при свайпе */}
      {translateX < -60 && (
        <div style={styles.deleteIndicator}>
          <div style={styles.deleteText}>Отпустите для удаления</div>
        </div>
      )}
    </div>
  )
}

const styles = {
  cardWrapper: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-left 0.2s, opacity 0.2s'
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
    pointerEvents: 'none'
  },
  deleteText: {
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '500',
    textAlign: 'center',
    padding: '0 1rem'
  }
}