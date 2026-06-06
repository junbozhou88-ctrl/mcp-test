import { navigate } from '../utils/navigation'

function TaskCard({ compact = false, task, onToggleDone }) {
  const className = compact ? 'row-task' : 'home-task'

  return (
    <article className={`${className} ${task.done ? 'is-complete' : ''}`}>
      <button
        className="task-copy"
        type="button"
        onClick={() => navigate(`/edit/${task.id}`)}
        aria-label={`编辑任务：${task.title}`}
      >
        <span>
          <strong>{task.title}</strong>
          <small>
            {task.done ? '✓ ' : '◷ '}
            {task.time}
          </small>
        </span>
      </button>
      <button
        className={`task-toggle ${task.done ? 'done' : ''}`}
        type="button"
        onClick={() => onToggleDone(task.id)}
        aria-label={task.done ? `标记 ${task.title} 为未完成` : `完成 ${task.title}`}
      >
        {task.done ? '✓' : ''}
      </button>
      {compact && <b>›</b>}
    </article>
  )
}

export default TaskCard
