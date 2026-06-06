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
    <div className="screen editor-screen">
      <button className="close-button" type="button" onClick={() => navigate('/')}>
        ×
      </button>

      <label className="title-input">
        <textarea
          value={draft.title}
          placeholder="书写此刻的任务..."
          rows="3"
          onChange={(event) => updateDraft('title', event.target.value)}
        />
      </label>

      <section className="editor-field">
        <div className="field-label">◷ 提醒时间</div>
        <div className="choice-grid">
          {timeOptions.map((time) => (
            <button
              className={draft.time === time ? 'is-selected' : ''}
              key={time}
              type="button"
              onClick={() => updateDraft('time', time)}
            >
              今天 {time}
            </button>
          ))}
        </div>
      </section>

      <section className="editor-field">
        <div className="field-label">任务分组</div>
        <div className="choice-grid compact">
          {groupOrder.map((group) => (
            <button
              className={draft.group === group ? 'is-selected' : ''}
              key={group}
              type="button"
              onClick={() => updateDraft('group', group)}
            >
              {group}
            </button>
          ))}
        </div>
      </section>

      <section className="editor-field">
        <div className="field-label">任务分类</div>
        <div className="choice-grid compact">
          {categoryOptions.map((category) => (
            <button
              className={draft.category === category ? 'is-selected' : ''}
              key={category}
              type="button"
              onClick={() => updateDraft('category', category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="editor-actions">
        <button className="save-button" type="button" onClick={handleSubmit} disabled={!canSubmit}>
          <span>{isEdit ? '▣' : '+'}</span>
          {isEdit ? '保存修改' : '添加任务'}
        </button>
        {isEdit && (
          <button className="delete-button" type="button" onClick={onDelete}>
            Ⅲ 删除任务
          </button>
        )}
      </div>
    </div>
  )
}

export default TaskEditor
