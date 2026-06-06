import BottomNav from '../components/BottomNav'
import TaskCard from '../components/TaskCard'
import { groupOrder } from '../data/initialTasks'
import { navigate } from '../utils/navigation'
import { sortTasksByTime } from '../utils/taskLogic'

function TasksPage({ onSortToggle, onToggleDone, sortDesc, tasks }) {
  const sortedTasks = sortTasksByTime(tasks, sortDesc)

  return (
    <div className="bg-screen relative min-h-[min(844px,calc(100svh-56px))] pt-[22px] px-6 pb-[104px] text-[#f3f1eb] max-[520px]:w-full max-[520px]:min-h-svh max-[520px]:rounded-none">
      <header className="flex items-center gap-3 mb-9">
        <button
          className="w-7 h-7 p-0 text-[#b6d7a8] bg-transparent text-[26px] cursor-pointer"
          type="button"
          onClick={() => navigate('/')}
        >
          ‹
        </button>
        <h1 className="m-0 text-[22px] tracking-normal">全部任务</h1>
      </header>

      <div className="flex items-center justify-between mb-[34px]">
        <span className="text-[#85887e] text-xs">共 {tasks.length} 个待办</span>
        <button
          className="text-[#b6d7a8] bg-[rgba(182,215,168,0.08)] text-xs py-[7px] px-[11px] rounded-full cursor-pointer"
          type="button"
          onClick={onSortToggle}
        >
          {sortDesc ? '时间倒序' : '时间正序'}
        </button>
      </div>

      <section className="grid gap-4">
        {groupOrder.map((group) => {
          const groupTasks = sortedTasks.filter((task) => task.group === group)
          if (groupTasks.length === 0) return null

          return (
            <div className="grid gap-3 mb-[42px]" key={group}>
              <h2 className="m-0 mb-2 text-[#b6d7a8] text-[21px]">{group}</h2>
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
