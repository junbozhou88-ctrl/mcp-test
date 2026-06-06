export function createTaskRecord(draft, id = String(Date.now())) {
  return {
    id,
    title: draft.title.trim(),
    time: draft.time,
    group: draft.group,
    done: false,
    category: draft.category,
  }
}

export function updateTaskRecord(tasks, taskId, draft) {
  return tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          title: draft.title.trim(),
          time: draft.time,
          group: draft.group,
          category: draft.category,
        }
      : task,
  )
}

export function deleteTaskRecord(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId)
}

export function toggleTaskDone(tasks, taskId) {
  return tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
}

export function calculateTaskStats(tasks) {
  const completed = tasks.filter((task) => task.done).length
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  return {
    completed,
    completionRate,
    total: tasks.length,
    weeklyCompleted: completed + 39,
    streakCount: 45,
  }
}

export function toMinutes(time) {
  const match = time.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return Number.MAX_SAFE_INTEGER
  return Number(match[1]) * 60 + Number(match[2])
}

export function sortTasksByTime(tasks, sortDesc) {
  return [...tasks].sort((a, b) => {
    const direction = sortDesc ? -1 : 1
    return (toMinutes(a.time) - toMinutes(b.time)) * direction
  })
}
