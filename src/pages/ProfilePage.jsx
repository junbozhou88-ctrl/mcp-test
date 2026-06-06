import AppHeader from '../components/AppHeader'
import BottomNav from '../components/BottomNav'

function ProfilePage() {
  return (
    <div className="bg-screen relative min-h-[min(844px,calc(100svh-56px))] pt-[22px] px-6 pb-[104px] text-[#f3f1eb] max-[520px]:w-full max-[520px]:min-h-svh max-[520px]:rounded-none">
      <AppHeader />

      <section className="grid justify-items-center mt-4">
        <div
          className="relative w-24 h-24 mb-[22px] rounded-full shadow-[0_0_0_2px_rgba(182,215,168,0.12),0_0_56px_rgba(182,215,168,0.12)]"
          style={{
            background:
              'radial-gradient(circle at 50% 29%, #d2a27d 0 18%, transparent 19%), radial-gradient(circle at 50% 82%, #2f3f2d 0 34%, transparent 35%), linear-gradient(145deg, #2f2d21, #7a8c67)',
          }}
        >
          <button
            className="absolute -right-2 bottom-[6px] w-8 h-8 rounded-full text-[#d9d8d1] bg-[#252822]"
            type="button"
          >
            ✎
          </button>
        </div>
        <h1 className="m-0 mb-3 text-[26px]">林深</h1>
        <p className="m-0 tracking-[0.35em] text-[#85887e] text-xs">ZEN EXPLORER · LV.12</p>
      </section>

      <section className="grid gap-[6px] text-[#85887e] text-xs text-center mt-[88px] mb-[80px]">
        <strong className="text-[#b6d7a8] text-[44px]">24</strong>
        <span>连续专注天数</span>
      </section>

      <div className="grid gap-4 mb-[42px]">
        <button
          className="flex items-center justify-between min-h-[72px] px-[22px] border border-[rgba(187,217,170,0.09)] rounded-[14px] text-[#d5d1c8] bg-[rgba(20,22,19,0.95)] cursor-pointer"
          type="button"
        >
          <span className="text-[#b6d7a8]">♙</span>
          账号与安全
          <i className="text-[#4b4f47] not-italic">›</i>
        </button>
        <button
          className="flex items-center justify-between min-h-[72px] px-[22px] border border-[rgba(187,217,170,0.09)] rounded-[14px] text-[#d5d1c8] bg-[rgba(20,22,19,0.95)] cursor-pointer"
          type="button"
        >
          <span className="text-[#b6d7a8]">☊</span>
          帮助与反馈
          <i className="text-[#4b4f47] not-italic">›</i>
        </button>
      </div>

      <small className="block text-center tracking-[0.08em] text-[#85887e] text-xs">
        ZENFLOW VERSION 2.4.0
      </small>
      <BottomNav active="/profile" />
    </div>
  )
}

export default ProfilePage
