import AppHeader from '../components/AppHeader'
import BottomNav from '../components/BottomNav'

function StatsPage({ stats }) {
  return (
    <div className="screen stats-screen">
      <AppHeader compact />

      <section className="stats-hero">
        <small>任务回顾</small>
        <h1>本周完成：{stats.weeklyCompleted}个任务</h1>
        <p>比上周提升了 15% 的效率</p>
      </section>

      <div className="stats-row">
        <span>
          <strong>{stats.completionRate}%</strong>
          完成率
        </span>
        <span>
          <strong>{stats.streakCount}</strong>
          连续达成
        </span>
      </div>

      <section className="chart-card">
        <div className="chart-head">
          <span>完成趋势</span>
          <small>过去 7 天</small>
        </div>
        <svg viewBox="0 0 300 150" role="img" aria-label="完成趋势折线图">
          <path
            className="chart-area"
            d="M10 108 C54 100 58 52 104 66 S166 116 210 82 S260 52 292 54 L292 140 L10 140 Z"
          />
          <path className="chart-line" d="M10 108 C54 100 58 52 104 66 S166 116 210 82 S260 52 292 54" />
        </svg>
        <div className="weekday-row">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </section>

      <h2 className="category-title">任务分类</h2>
      <div className="category-grid">
        <span>
          重点任务
          <strong>65%</strong>
        </span>
        <span>
          创意构思
          <strong>20%</strong>
        </span>
        <span>
          日常回顾
          <strong>15%</strong>
        </span>
      </div>

      <BottomNav active="/stats" />
    </div>
  )
}

export default StatsPage
