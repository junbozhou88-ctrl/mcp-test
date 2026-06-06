import { navigate } from '../utils/navigation'

function AppHeader({ compact = false }) {
  return (
    <header className={`flex items-center justify-between ${compact ? 'mb-[54px]' : 'mb-11'}`}>
      <button
        className="inline-flex items-center gap-2 p-0 text-[#b6d7a8] bg-transparent font-bold cursor-pointer"
        type="button"
        onClick={() => navigate('/')}
      >
        <span className="text-[#b6d7a8] text-lg">⌘</span>
        <span>ZenFlow</span>
      </button>
      <button
        className="grid w-7 h-7 place-items-center p-0 rounded-full cursor-pointer shadow-[0_0_0_1px_rgba(182,215,168,0.2)]"
        style={{
          background:
            'radial-gradient(circle at 50% 32%, #d9b08a 0 12%, transparent 13%), radial-gradient(circle at 50% 74%, #486a40 0 28%, transparent 29%), #20251d',
        }}
        type="button"
        onClick={() => navigate('/profile')}
        aria-label="个人中心"
      >
        <span
          className="w-[18px] h-[18px] rounded-full opacity-[0.65]"
          style={{ background: 'linear-gradient(145deg, #141b12, #86a37d)' }}
        ></span>
      </button>
    </header>
  )
}

export default AppHeader
