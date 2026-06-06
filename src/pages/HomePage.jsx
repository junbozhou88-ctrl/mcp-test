import AppHeader from '../components/AppHeader'
import BottomNav from '../components/BottomNav'
import TaskCard from '../components/TaskCard'
import { navigate } from '../utils/navigation'

function HomePage({ onToggleDone, stats, tasks }) {
  const todayTasks = tasks.filter((task) => task.group === '今天').slice(0, 3)
  const unfinishedCount = tasks.filter((task) => task.group === '今天' && !task.done).length

  return (
    <div className="screen home-screen">
      <AppHeader />

      <section className="summary-card">
        <div>
          <small>今日概要</small>
          <strong>剩余 {unfinishedCount} 个任务</strong>
        </div>
        <span>
          {stats.completed}/{stats.total}
        </span>
      </section>

      <p className="calm-copy">保持平和，按部就班处理待办</p>

      <section className="section-title">
        <h1>今日任务</h1>
        <button type="button" onClick={() => navigate('/tasks')}>
          查看全部
        </button>
      </section>

      <div className="home-list">
        {todayTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggleDone={onToggleDone} />
        ))}
      </div>

      <p className="quote">水滴石穿，非力使然，而是恒久。</p>
      <button className="fab" type="button" onClick={() => navigate('/new')} aria-label="新增任务">
        +
      </button>
      <BottomNav active="/" />
    </div>
  )
}

export default HomePage
