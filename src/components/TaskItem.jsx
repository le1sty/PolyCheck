import { useStore } from '../store'

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useStore()
  
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="task-checkbox"
        />
        <div className="task-text">
          <span>{task.text}</span>
          {task.completed && (
            <span className="task-status">✓ Выполнено</span>
          )}
        </div>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="task-delete"
        aria-label="Удалить задачу"
      >
        🗑️
      </button>
    </div>
  )
}