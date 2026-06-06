import TaskEditor from '../components/TaskEditor'

function TaskEditorPage({ mode, onDelete, onSubmit, task }) {
  return <TaskEditor mode={mode} onDelete={onDelete} onSubmit={onSubmit} task={task} />
}

export default TaskEditorPage
