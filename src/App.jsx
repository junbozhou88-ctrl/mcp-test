import { useMemo, useState } from 'react'
import { initialTasks } from './data/initialTasks'
import { useHashRoute } from './hooks/useHashRoute'
import HomePage from './pages/HomePage'
import TasksPage from './pages/TasksPage'
import TaskEditorPage from './pages/TaskEditorPage'
import StatsPage from './pages/StatsPage'
import ProfilePage from './pages/ProfilePage'
import { navigate } from './utils/navigation'
import {
  calculateTaskStats,
  createTaskRecord,
  deleteTaskRecord,
  toggleTaskDone,
  updateTaskRecord,
} from './utils/taskLogic'
import './App.css'

function App() {
  const route = useHashRoute()
  const [tasks, setTasks] = useState(initialTasks)
  const [sortDesc, setSortDesc] = useState(false)

  const activeTaskId = route.startsWith('/edit/') ? route.split('/')[2] : null
  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? tasks[0]

  const stats = useMemo(() => {
    return calculateTaskStats(tasks)
  }, [tasks])

  function createTask(draft) {
    setTasks((currentTasks) => [createTaskRecord(draft), ...currentTasks])
    navigate('/tasks')
  }

  function updateTask(taskId, draft) {
    setTasks((currentTasks) => updateTaskRecord(currentTasks, taskId, draft))
    navigate('/tasks')
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => deleteTaskRecord(currentTasks, taskId))
    navigate('/tasks')
  }

  function toggleDone(taskId) {
    setTasks((currentTasks) => toggleTaskDone(currentTasks, taskId))
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
    <main className="bg-stage grid min-h-svh place-items-center p-7 max-[520px]:p-0">
      <section className="w-[min(390px,100%)] min-h-[min(844px,calc(100svh-56px))] overflow-hidden rounded-[10px] bg-[#0d0f0d] shadow-[0_24px_70px_rgba(0,0,0,0.24)] max-[520px]:w-full max-[520px]:min-h-svh max-[520px]:rounded-none">
        {page}
      </section>
    </main>
  )
}

export default App
