import { useStore } from '../store'

export function Stats() {
  const { tasks } = useStore()
  
  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  
  // Моковые данные для графика
  const weeklyData = [4, 6, 3, 8, 5, 9, 7]
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const maxValue = Math.max(...weeklyData)
  
  return (
    <div className="page stats">
      <h2>Статистика</h2>
      
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <span className="stat-value">{totalCount}</span>
            <span className="stat-label">Всего задач</span>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Выполнено</span>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <span className="stat-value">{totalCount - completedCount}</span>
            <span className="stat-label">В процессе</span>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <span className="stat-value">{percentage}%</span>
            <span className="stat-label">Продуктивность</span>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3>Прогресс выполнения</h3>
        <div className="progress-container">
          <div className="progress-bar large">
            <div 
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="progress-labels">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <p className="progress-text">
          Вы выполнили {completedCount} из {totalCount} задач
        </p>
      </div>
      
      <div className="card">
        <h3>Активность по дням</h3>
        <div className="chart">
          {weeklyData.map((value, index) => (
            <div key={index} className="chart-column">
              <div 
                className="chart-bar"
                style={{ height: `${(value / maxValue) * 100}%` }}
              >
                <span className="chart-value">{value}</span>
              </div>
              <span className="chart-label">{days[index]}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <h3>Достижения</h3>
        <div className="achievements">
          <div className={`achievement ${completedCount >= 1 ? 'unlocked' : ''}`}>
            <span className="achievement-icon">🎯</span>
            <div className="achievement-info">
              <span className="achievement-title">Первая задача</span>
              <span className="achievement-desc">Выполните первую задачу</span>
            </div>
            <span className="achievement-status">
              {completedCount >= 1 ? '✅' : '🔒'}
            </span>
          </div>
          
          <div className={`achievement ${completedCount >= 5 ? 'unlocked' : ''}`}>
            <span className="achievement-icon">🏆</span>
            <div className="achievement-info">
              <span className="achievement-title">Пятерка</span>
              <span className="achievement-desc">Выполните 5 задач</span>
            </div>
            <span className="achievement-status">
              {completedCount >= 5 ? '✅' : '🔒'}
            </span>
          </div>
          
          <div className={`achievement ${percentage >= 50 ? 'unlocked' : ''}`}>
            <span className="achievement-icon">⭐</span>
            <div className="achievement-info">
              <span className="achievement-title">Половина пути</span>
              <span className="achievement-desc">50% продуктивность</span>
            </div>
            <span className="achievement-status">
              {percentage >= 50 ? '✅' : '🔒'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}