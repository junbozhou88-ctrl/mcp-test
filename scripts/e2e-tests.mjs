import puppeteer from 'puppeteer'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import http from 'node:http'
import { mkdirSync } from 'node:fs'

const screenshotDir = join(process.cwd(), 'tests', 'screenshots')
const port = 5188
const targetUrl = `http://localhost:${port}/`

// Ensure screenshots directory exists
mkdirSync(screenshotDir, { recursive: true })

function checkUrl() {
  return new Promise((resolve) => {
    http.get(targetUrl, (res) => {
      resolve(res.statusCode === 200)
    }).on('error', () => {
      resolve(false)
    })
  })
}

async function run() {
  console.log('Starting local Vite dev server on port 5188...')
  const vite = spawn('npx', ['vite', '--port', String(port)], {
    shell: true
  })

  // Wait for the dev server to be ready
  let ready = false
  for (let i = 0; i < 30; i++) {
    ready = await checkUrl()
    if (ready) break
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  if (!ready) {
    vite.kill()
    throw new Error('Vite dev server failed to start in time.')
  }
  console.log('✓ Vite dev server is ready!')

  let browser
  let isConnected = false
  try {
    console.log('Trying to connect to existing Chrome instance at http://127.0.0.1:9222...')
    browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' })
    isConnected = true
    console.log('✓ Connected to existing Chrome instance!')
  } catch (err) {
    console.log('Existing Chrome instance not found or failed to connect. Launching new headless browser...')
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  }

  let page
  try {
    page = await browser.newPage()
    await page.setViewport({ width: 390, height: 844 })

    console.log(`Navigating to ${targetUrl}...`)
    await page.goto(targetUrl, { waitUntil: 'networkidle2' })

    const clickByText = async (selector, text) => {
      // Wait for element to be present in DOM first
      await page.waitForFunction((sel, txt) => {
        const elements = Array.from(document.querySelectorAll(sel))
        return elements.some(el => el.textContent.includes(txt))
      }, { timeout: 5000 }, selector, text)

      await page.evaluate((sel, txt) => {
        const elements = Array.from(document.querySelectorAll(sel))
        const target = elements.find(el => el.textContent.includes(txt))
        if (!target) throw new Error(`Element ${sel} with text "${txt}" not found`)
        target.click()
      }, selector, text)
    }

    // Step 1: Home page
    console.log('Step 1: Checking homepage...')
    await page.waitForSelector('h1')
    await page.screenshot({ path: join(screenshotDir, 'step1_homepage.png') })
    console.log('✓ Homepage screenshot taken')

    // Step 2: Navigate to All Tasks page
    console.log('Step 2: Navigating to all tasks page...')
    await clickByText('button', '查看全部')
    await page.waitForFunction(() => window.location.hash === '#/tasks')
    await page.screenshot({ path: join(screenshotDir, 'step2_tasks_page.png') })
    console.log('✓ Tasks page screenshot taken')

    // Step 3: Go back and navigate to New Task page
    console.log('Step 3: Going back to home and navigating to new task page...')
    const backBtn = await page.waitForSelector('header button')
    await backBtn.click()
    await page.waitForFunction(() => window.location.hash === '#/' || window.location.hash === '')
    
    const addBtn = await page.waitForSelector('button[aria-label="新增任务"]')
    await addBtn.click()
    await page.waitForFunction(() => window.location.hash === '#/new')
    await page.screenshot({ path: join(screenshotDir, 'step3_new_task_page.png') })
    console.log('✓ New task page screenshot taken')

    // Step 4: Write and create task
    console.log('Step 4: Creating a new task...')
    const textarea = await page.waitForSelector('textarea')
    await textarea.type('测试 DevTools 任务')
    
    await clickByText('button', '今天 14:00')
    await clickByText('button', '添加任务')

    await page.waitForFunction(() => window.location.hash === '#/tasks')
    await page.screenshot({ path: join(screenshotDir, 'step4_tasks_added.png') })
    console.log('✓ Task added and redirected to tasks page')

    // Step 5: Toggle task completion
    console.log('Step 5: Toggling completion status...')
    // Wait for the task card to appear
    await page.waitForFunction(() => {
      const articles = Array.from(document.querySelectorAll('article'))
      return articles.some(article => article.textContent.includes('测试 DevTools 任务'))
    }, { timeout: 5000 })

    await page.evaluate(() => {
      const articles = Array.from(document.querySelectorAll('article'))
      const targetArticle = articles.find(article => article.textContent.includes('测试 DevTools 任务'))
      if (!targetArticle) throw new Error('Target task not found')
      const toggleBtn = targetArticle.querySelector('button[aria-label^="完成"]')
      if (!toggleBtn) throw new Error('Toggle button not found')
      toggleBtn.click()
    })
    await new Promise(r => setTimeout(r, 500))
    await page.screenshot({ path: join(screenshotDir, 'step5_task_completed.png') })
    console.log('✓ Task completion toggled')

    // Step 6: Go to edit page
    console.log('Step 6: Navigating to edit page...')
    await page.evaluate(() => {
      const articles = Array.from(document.querySelectorAll('article'))
      const targetArticle = articles.find(article => article.textContent.includes('测试 DevTools 任务'))
      if (!targetArticle) throw new Error('Target task not found')
      const editBtn = targetArticle.querySelector('button[aria-label^="编辑任务"]')
      if (!editBtn) throw new Error('Edit button not found')
      editBtn.click()
    })
    await page.waitForFunction(() => window.location.hash.startsWith('#/edit/'))
    await page.screenshot({ path: join(screenshotDir, 'step6_edit_task_page.png') })
    console.log('✓ Edit page screenshot taken')

    // Step 7: Delete task
    console.log('Step 7: Deleting the task...')
    await clickByText('button', '删除任务')
    await page.waitForFunction(() => window.location.hash === '#/tasks')
    await page.screenshot({ path: join(screenshotDir, 'step7_task_deleted.png') })
    console.log('✓ Task deleted successfully')

    // Step 8: Go to Stats page
    console.log('Step 8: Navigating to stats page...')
    const statsBtn = await page.waitForSelector('nav[aria-label="底部导航"] button[aria-label="统计"]')
    await statsBtn.click()
    await page.waitForFunction(() => window.location.hash === '#/stats')
    await page.screenshot({ path: join(screenshotDir, 'step8_stats_page.png') })
    console.log('✓ Stats page screenshot taken')

    // Step 9: Go to Profile page
    console.log('Step 9: Navigating to profile page...')
    const profileBtn = await page.waitForSelector('nav[aria-label="底部导航"] button[aria-label="我的"]')
    await profileBtn.click()
    await page.waitForFunction(() => window.location.hash === '#/profile')
    await page.screenshot({ path: join(screenshotDir, 'step9_profile_page.png') })
    console.log('✓ Profile page screenshot taken')

    console.log('E2E automation tests completed successfully.')
  } finally {
    if (page) {
      await page.close().catch(() => {})
    }
    if (browser) {
      if (isConnected) {
        await browser.disconnect().catch(() => {})
      } else {
        await browser.close().catch(() => {})
      }
    }
    vite.kill()
    console.log('Vite dev server stopped.')
  }
}

run().catch((error) => {
  console.error('Test failed:', error)
  process.exit(1)
})
