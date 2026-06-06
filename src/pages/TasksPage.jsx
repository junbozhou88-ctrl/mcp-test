import BottomNav from '../components/BottomNav'
import TaskCard from '../components/TaskCard'
import { groupOrder } from '../data/initialTasks'
import { navigate } from '../utils/navigation'

function toMinutes(time) {
  const match = time.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return Number.MAX_SAFE_INTEGER
  return Number(match[1]) * 60 + Number(match[2])
}

function TasksPage({ onSortToggle, onToggleDone, sortDesc, tasks }) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const direction = sortDesc ? -1 : 1
    return (toMinutes(a.time) - toMinutes(b.time)) * direction
  })

  return (
    <div className="screen tasks-screen">
      <header className="page-bar">
        <button type="button" onClick={() => navigate('/')}>
          ‹
        </button>
        <h1>全部任务</h1>
      </header>

      <div className="task-total">
        <span>共 {tasks.length} 个待办</span>
        <button type="button" onClick={onSortToggle}>
          {sortDesc ? '时间倒序' : '时间正序'}
        </button>
      </div>

      <section className="grouped-tasks">
        {groupOrder.map((group) => {
          const groupTasks = sortedTasks.filter((task) => task.group === group)
          if (groupTasks.length === 0) return null

          return (
            <div className="task-group" key={group}>
              <h2>{group}</h2>
              {groupTasks.map((task) => (
                <TaskCard compact key={task.id} task={task} onToggleDone={onToggleDone} />
              ))}
            </div>
          )
        })}
      </section>

      <BottomNav active="/" />
    </div>
  )
}

export default TasksPage
