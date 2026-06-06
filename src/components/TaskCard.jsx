import { navigate } from '../utils/navigation'

function TaskCard({ compact = false, task, onToggleDone }) {
  if (compact) {
    return (
      <article className="flex items-center gap-[14px] min-h-[54px] w-full text-[#f3f1eb] text-left bg-transparent cursor-pointer">
        <button
          className="flex-1 min-w-0 p-0 text-[#f3f1eb] text-left bg-transparent cursor-pointer"
          type="button"
          onClick={() => navigate(`/edit/${task.id}`)}
          aria-label={`编辑任务：${task.title}`}
        >
          <span className="grid gap-[7px]">
            <strong
              className={`block overflow-hidden text-[15px] text-ellipsis whitespace-nowrap ${task.done ? 'text-[#8f9488] line-through' : 'text-[#f3f1eb]'}`}
            >
              {task.title}
            </strong>
            <small className="text-[#85887e] text-xs">
              {task.done ? '✓ ' : '◷ '}
              {task.time}
            </small>
          </span>
        </button>
        <button
          className={`grid place-items-center basis-[21px] w-[21px] h-[21px] rounded-full text-[#b6d7a8] cursor-pointer ${
            task.done
              ? 'border-0 bg-[rgba(116,153,101,0.28)]'
              : 'border-2 border-[rgba(182,215,168,0.32)] bg-transparent'
          }`}
          type="button"
          onClick={() => onToggleDone(task.id)}
          aria-label={task.done ? `标记 ${task.title} 为未完成` : `完成 ${task.title}`}
        >
          {task.done ? '✓' : ''}
        </button>
        <b className="text-[#85887e] text-[24px] font-normal">›</b>
      </article>
    )
  }

  return (
    <article className="flex items-center justify-between min-h-[78px] py-[18px] px-5 border border-[rgba(187,217,170,0.09)] rounded-xl bg-[rgba(24,26,23,0.92)]">
      <button
        className="flex-1 min-w-0 p-0 text-[#f3f1eb] text-left bg-transparent cursor-pointer"
        type="button"
        onClick={() => navigate(`/edit/${task.id}`)}
        aria-label={`编辑任务：${task.title}`}
      >
        <span className="grid gap-[7px]">
          <strong
            className={`block overflow-hidden text-[15px] text-ellipsis whitespace-nowrap ${task.done ? 'text-[#8f9488] line-through' : 'text-[#f3f1eb]'}`}
          >
            {task.title}
          </strong>
          <small className="text-[#85887e] text-xs">
            {task.done ? '✓ ' : '◷ '}
            {task.time}
          </small>
        </span>
      </button>
      <button
        className={`grid flex-[0_0_30px] w-[30px] h-[30px] place-items-center rounded-full text-[#b6d7a8] cursor-pointer ${
          task.done
            ? 'border-0 bg-[rgba(116,153,101,0.28)]'
            : 'border-2 border-[rgba(182,215,168,0.32)] bg-transparent'
        }`}
        type="button"
        onClick={() => onToggleDone(task.id)}
        aria-label={task.done ? `标记 ${task.title} 为未完成` : `完成 ${task.title}`}
      >
        {task.done ? '✓' : ''}
      </button>
    </article>
  )
}

export default TaskCard
