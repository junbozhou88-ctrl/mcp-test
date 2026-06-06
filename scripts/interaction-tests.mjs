import assert from 'node:assert/strict'
import { initialTasks } from '../src/data/initialTasks.js'
import {
  calculateTaskStats,
  createTaskRecord,
  deleteTaskRecord,
  sortTasksByTime,
  toggleTaskDone,
  updateTaskRecord,
} from '../src/utils/taskLogic.js'

const results = []

function test(name, fn) {
  try {
    fn()
    results.push({ name, status: 'passed' })
  } catch (error) {
    results.push({ name, status: 'failed', message: error.message })
  }
}

test('createTaskRecord trims title and creates unfinished task', () => {
  const task = createTaskRecord(
    {
      title: '  新任务标题  ',
      time: '14:00',
      group: '明天',
      category: '创意构思',
    },
    'test-id',
  )

  assert.equal(task.id, 'test-id')
  assert.equal(task.title, '新任务标题')
  assert.equal(task.done, false)
  assert.equal(task.group, '明天')
})

test('updateTaskRecord updates only the selected task', () => {
  const updated = updateTaskRecord(initialTasks, 'task-1', {
    title: '  已更新任务  ',
    time: '19:00',
    group: '稍后',
    category: '日常回顾',
  })

  const target = updated.find((task) => task.id === 'task-1')
  const untouched = updated.find((task) => task.id === 'task-2')

  assert.equal(target.title, '已更新任务')
  assert.equal(target.time, '19:00')
  assert.equal(target.group, '稍后')
  assert.equal(untouched.title, '品牌视觉资产审阅')
})

test('deleteTaskRecord removes selected task', () => {
  const updated = deleteTaskRecord(initialTasks, 'task-2')
  assert.equal(updated.some((task) => task.id === 'task-2'), false)
  assert.equal(updated.length, initialTasks.length - 1)
})

test('toggleTaskDone toggles completion state', () => {
  const updated = toggleTaskDone(initialTasks, 'task-1')
  assert.equal(updated.find((task) => task.id === 'task-1').done, true)

  const restored = toggleTaskDone(updated, 'task-1')
  assert.equal(restored.find((task) => task.id === 'task-1').done, false)
})

test('sortTasksByTime supports ascending and descending order', () => {
  const sameDayTasks = initialTasks.filter((task) => task.group === '今天')
  const asc = sortTasksByTime(sameDayTasks, false)
  const desc = sortTasksByTime(sameDayTasks, true)

  assert.equal(asc[0].time, '08:00')
  assert.equal(desc[0].time, '16:30')
})

test('calculateTaskStats reflects task completion ratio', () => {
  const stats = calculateTaskStats(initialTasks)
  const completed = initialTasks.filter((task) => task.done).length

  assert.equal(stats.completed, completed)
  assert.equal(stats.total, initialTasks.length)
  assert.equal(stats.completionRate, Math.round((completed / initialTasks.length) * 100))
})

const failed = results.filter((result) => result.status === 'failed')

for (const result of results) {
  if (result.status === 'passed') {
    console.log(`PASS ${result.name}`)
  } else {
    console.log(`FAIL ${result.name}: ${result.message}`)
  }
}

if (failed.length > 0) {
  process.exitCode = 1
} else {
  console.log(`\n${results.length} interaction tests passed.`)
}
