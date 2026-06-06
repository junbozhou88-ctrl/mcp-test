import AppHeader from '../components/AppHeader'
import BottomNav from '../components/BottomNav'
import TaskCard from '../components/TaskCard'
import { navigate } from '../utils/navigation'

function HomePage({ onToggleDone, stats, tasks }) {
  const todayTasks = tasks.filter((task) => task.group === '今天').slice(0, 3)
  const unfinishedCount = tasks.filter((task) => task.group === '今天' && !task.done).length

  return (
    <div className="bg-screen relative min-h-[min(844px,calc(100svh-56px))] pt-[22px] px-6 pb-[104px] text-[#f3f1eb] max-[520px]:w-full max-[520px]:min-h-svh max-[520px]:rounded-none">
      <AppHeader />

      <section className="flex items-center justify-between min-h-[98px] py-5 px-6 border border-[rgba(187,217,170,0.09)] rounded-[20px] bg-[rgba(28,31,26,0.74)]">
        <div className="grid gap-[7px]">
          <small className="text-[#b6d7a8] text-xs font-bold">今日概要</small>
          <strong className="text-[#b6d7a8] text-[22px]">剩余 {unfinishedCount} 个任务</strong>
        </div>
        <span className="grid w-11 h-11 place-items-center border border-[rgba(182,215,168,0.24)] rounded-full text-[#b6d7a8] text-[13px]">
          {stats.completed}/{stats.total}
        </span>
      </section>

      <p className="mt-[22px] mb-[38px] text-[#c9c5bc] text-[13px] text-center">
        保持平和，按部就班处理待办
      </p>

      <section className="flex items-center justify-between mb-[18px]">
        <h1 className="m-0 text-[22px] tracking-normal">今日任务</h1>
        <button
          className="text-[#b6d7a8] bg-transparent text-xs cursor-pointer p-0"
          type="button"
          onClick={() => navigate('/tasks')}
        >
          查看全部
        </button>
      </section>

      <div className="grid gap-4">
        {todayTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggleDone={onToggleDone} />
        ))}
      </div>

      <p className="mt-[72px] mb-[38px] text-[#c9c5bc] text-[13px] text-center italic">
        水滴石穿，非力使然，而是恒久。
      </p>
      <button
        className="absolute right-6 bottom-[86px] grid w-[54px] h-[54px] place-items-center rounded-[16px] text-[#10140f] bg-[#b6d7a8] text-[30px] cursor-pointer"
        type="button"
        onClick={() => navigate('/new')}
        aria-label="新增任务"
      >
        +
      </button>
      <BottomNav active="/" />
    </div>
  )
}

export default HomePage
