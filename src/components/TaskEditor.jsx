import { useState } from 'react'
import { categoryOptions, groupOrder, timeOptions } from '../data/initialTasks'
import { navigate } from '../utils/navigation'

const defaultDraft = {
  title: '',
  time: '09:00',
  group: '今天',
  category: '重点任务',
}

function TaskEditor({ mode, onDelete, onSubmit, task }) {
  const [draft, setDraft] = useState(task ?? defaultDraft)
  const isEdit = mode === 'edit'
  const canSubmit = draft.title.trim().length > 0

  function updateDraft(key, value) {
    setDraft((currentDraft) => ({ ...currentDraft, [key]: value }))
  }

  function handleSubmit() {
    if (!canSubmit) return
    onSubmit(draft)
  }

  return (
    <div className="bg-editor relative min-h-[min(844px,calc(100svh-56px))] pt-[34px] px-6 pb-[180px] text-[#f3f1eb] flex flex-col max-[520px]:w-full max-[520px]:min-h-svh">
      <button
        className="w-7 h-7 p-0 text-[#d8d7d2] bg-transparent text-[26px] cursor-pointer mb-[6px]"
        type="button"
        onClick={() => navigate('/')}
      >
        ×
      </button>

      <label className="relative block mb-[78px] after:absolute after:bottom-[3px] after:left-0 after:w-[46px] after:h-[2px] after:content-[''] after:bg-[rgba(182,215,168,0.3)]">
        <textarea
          className="w-full min-h-[84px] resize-none border-0 text-[#f3f1eb] bg-transparent text-[20px] leading-[1.38] outline-none placeholder:text-[#686b63]"
          value={draft.title}
          placeholder="书写此刻的任务..."
          rows="3"
          onChange={(event) => updateDraft('title', event.target.value)}
        />
      </label>

      <section className="grid gap-3 mb-[22px]">
        <div className="text-[#9caf91] text-[13px]">◷ 提醒时间</div>
        <div className="grid grid-cols-2 gap-[10px]">
          {timeOptions.map((time) => (
            <button
              className={`min-h-[46px] py-0 px-[10px] border rounded-[14px] cursor-pointer ${
                draft.time === time
                  ? 'border-[rgba(182,215,168,0.42)] text-[#172015] bg-[#b6d7a8]'
                  : 'border-[rgba(187,217,170,0.09)] text-[#9caf91] bg-[rgba(28,31,26,0.76)]'
              }`}
              key={time}
              type="button"
              onClick={() => updateDraft('time', time)}
            >
              今天 {time}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-3 mb-[22px]">
        <div className="text-[#9caf91] text-[13px]">任务分组</div>
        <div className="grid grid-cols-3 gap-[10px]">
          {groupOrder.map((group) => (
            <button
              className={`min-h-[46px] py-0 px-[10px] border rounded-[14px] cursor-pointer ${
                draft.group === group
                  ? 'border-[rgba(182,215,168,0.42)] text-[#172015] bg-[#b6d7a8]'
                  : 'border-[rgba(187,217,170,0.09)] text-[#9caf91] bg-[rgba(28,31,26,0.76)]'
              }`}
              key={group}
              type="button"
              onClick={() => updateDraft('group', group)}
            >
              {group}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-3 mb-[22px]">
        <div className="text-[#9caf91] text-[13px]">任务分类</div>
        <div className="grid grid-cols-3 gap-[10px]">
          {categoryOptions.map((category) => (
            <button
              className={`min-h-[46px] py-0 px-[10px] border rounded-[14px] cursor-pointer ${
                draft.category === category
                  ? 'border-[rgba(182,215,168,0.42)] text-[#172015] bg-[#b6d7a8]'
                  : 'border-[rgba(187,217,170,0.09)] text-[#9caf91] bg-[rgba(28,31,26,0.76)]'
              }`}
              key={category}
              type="button"
              onClick={() => updateDraft('category', category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="absolute right-6 bottom-[42px] left-6 grid gap-5">
        <button
          className="min-h-[64px] rounded-[20px] text-[#182116] bg-[#b6d7a8] font-bold cursor-pointer disabled:text-[#51574d] disabled:bg-[#2e332b] disabled:cursor-not-allowed"
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          <span>{isEdit ? '▣' : '+'}</span>
          {isEdit ? '保存修改' : '添加任务'}
        </button>
        {isEdit && (
          <button
            className="text-[#686b63] bg-transparent text-xs cursor-pointer"
            type="button"
            onClick={onDelete}
          >
            Ⅲ 删除任务
          </button>
        )}
      </div>
    </div>
  )
}

export default TaskEditor
