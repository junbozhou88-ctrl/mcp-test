import AppHeader from '../components/AppHeader'
import BottomNav from '../components/BottomNav'

function StatsPage({ stats }) {
  return (
    <div className="bg-screen relative min-h-[min(844px,calc(100svh-56px))] pt-[22px] px-6 pb-[104px] text-[#f3f1eb] max-[520px]:w-full max-[520px]:min-h-svh max-[520px]:rounded-none">
      <AppHeader compact />

      <section className="mt-[82px] text-center">
        <small className="text-[#b6d7a8] text-xs font-bold">任务回顾</small>
        <h1 className="max-w-[300px] mx-auto mt-3 mb-5 text-[#f3f1eb] text-[32px] leading-[1.14]">
          本周完成：{stats.weeklyCompleted}个任务
        </h1>
        <p className="m-0 text-[#85887e] text-sm">比上周提升了 15% 的效率</p>
      </section>

      <div className="flex justify-center gap-[52px] mt-[46px] mb-[58px]">
        <span className="grid gap-[6px] text-[#85887e] text-xs text-center">
          <strong className="text-[#b6d7a8] text-base">{stats.completionRate}%</strong>
          完成率
        </span>
        <span className="grid gap-[6px] text-[#85887e] text-xs text-center">
          <strong className="text-[#b6d7a8] text-base">{stats.streakCount}</strong>
          连续达成
        </span>
      </div>

      <section className="min-h-[230px] py-[22px] px-5 pb-[18px] border border-[rgba(187,217,170,0.09)] rounded-[18px] bg-[rgba(20,22,19,0.95)]">
        <div className="flex justify-between text-[#85887e] text-[13px]">
          <span>完成趋势</span>
          <small className="text-xs text-[#85887e]">过去 7 天</small>
        </div>
        <svg className="w-full mt-[18px] mb-[8px]" viewBox="0 0 300 150" role="img" aria-label="完成趋势折线图">
          <path
            className="fill-[rgba(116,153,101,0.12)]"
            d="M10 108 C54 100 58 52 104 66 S166 116 210 82 S260 52 292 54 L292 140 L10 140 Z"
          />
          <path
            className="fill-none stroke-[#78986d] stroke-2"
            d="M10 108 C54 100 58 52 104 66 S166 116 210 82 S260 52 292 54"
          />
        </svg>
        <div className="grid grid-cols-7 gap-[6px] text-center text-[#85887e] text-xs">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </section>

      <h2 className="mt-[74px] mb-[18px] text-[#85887e] text-[15px] font-medium text-center">任务分类</h2>
      <div className="grid grid-cols-3 gap-3">
        <span className="grid min-h-[72px] place-items-center border border-[rgba(187,217,170,0.09)] rounded-xl bg-[rgba(20,22,19,0.95)] gap-[6px] text-[#85887e] text-xs text-center">
          重点任务
          <strong className="text-[#b6d7a8] text-base">65%</strong>
        </span>
        <span className="grid min-h-[72px] place-items-center border border-[rgba(187,217,170,0.09)] rounded-xl bg-[rgba(20,22,19,0.95)] gap-[6px] text-[#85887e] text-xs text-center">
          创意构思
          <strong className="text-[#b6d7a8] text-base">20%</strong>
        </span>
        <span className="grid min-h-[72px] place-items-center border border-[rgba(187,217,170,0.09)] rounded-xl bg-[rgba(20,22,19,0.95)] gap-[6px] text-[#85887e] text-xs text-center">
          日常回顾
          <strong className="text-[#b6d7a8] text-base">15%</strong>
        </span>
      </div>

      <BottomNav active="/stats" />
    </div>
  )
}

export default StatsPage
