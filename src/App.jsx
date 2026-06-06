import { useMemo, useState } from 'react'
import { initialTasks } from './data/initialTasks'
import { useHashRoute } from './hooks/useHashRoute'
import HomePage from './pages/HomePage'
import TasksPage from './pages/TasksPage'
import TaskEditorPage from './pages/TaskEditorPage'
import StatsPage from './pages/StatsPage'
import ProfilePage from './pages/ProfilePage'
import { navigate } from './utils/navigation'
import './App.css'

function App() {
  const route = useHashRoute()
  const [tasks, setTasks] = useState(initialTasks)
  const [sortDesc, setSortDesc] = useState(false)

  const activeTaskId = route.startsWith('/edit/') ? route.split('/')[2] : null
  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? tasks[0]

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.done).length
    const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

    return {
      completed,
      completionRate,
      total: tasks.length,
      weeklyCompleted: completed + 39,
      streakCount: 45,
    }
  }, [tasks])

  function createTask(draft) {
    const nextTask = {
      id: String(Date.now()),
      title: draft.title.trim(),
      time: draft.time,
      group: draft.group,
      done: false,
      category: draft.category,
    }

    setTasks((currentTasks) => [nextTask, ...currentTasks])
    navigate('/tasks')
  }

  function updateTask(taskId, draft) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: draft.title.trim(),
              time: draft.time,
              group: draft.group,
              category: draft.category,
            }
          : task,
      ),
    )
    navigate('/tasks')
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
    navigate('/tasks')
  }

  function toggleDone(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
    )
  }

  const page = useMemo(() => {
    if (route === '/tasks') {
      return (
        <TasksPage
          sortDesc={sortDesc}
          tasks={tasks}
          onSortToggle={() => setSortDesc((value) => !value)}
          onToggleDone={toggleDone}
        />
      )
    }

    if (route === '/new') {
      return <TaskEditorPage mode="create" onSubmit={createTask} />
    }

    if (route.startsWith('/edit/')) {
      return (
        <TaskEditorPage
          mode="edit"
          task={activeTask}
          onDelete={() => deleteTask(activeTask.id)}
          onSubmit={(draft) => updateTask(activeTask.id, draft)}
        />
      )
    }

    if (route === '/stats') {
      return <StatsPage stats={stats} />
    }

    if (route === '/profile') {
      return <ProfilePage />
    }

    return <HomePage stats={stats} tasks={tasks} onToggleDone={toggleDone} />
  }, [activeTask, route, sortDesc, stats, tasks])

  return (
    <main className="prototype-stage">
      <section className="phone-shell">{page}</section>
    </main>
  )
}

export default App
