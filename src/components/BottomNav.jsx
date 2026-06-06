import { navigate } from '../utils/navigation'

const navItems = [
  { path: '/', icon: '▦', label: '首页' },
  { path: '/stats', icon: '▣', label: '统计' },
  { path: '/profile', icon: '♟', label: '我的' },
]

function BottomNav({ active }) {
  return (
    <nav
      className="absolute right-7 bottom-[22px] left-7 grid grid-cols-3 gap-5 min-h-[64px] py-[10px] px-5 border border-[rgba(182,215,168,0.08)] rounded-full bg-[rgba(27,29,25,0.95)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
      aria-label="底部导航"
    >
      {navItems.map((item) => (
        <button
          className={`grid place-items-center rounded-full text-lg cursor-pointer ${
            active === item.path
              ? 'text-[#eef8e6] bg-[radial-gradient(circle,#82aa75_0,#517248_70%)] shadow-[0_0_24px_rgba(182,215,168,0.25)]'
              : 'text-[#85887e] bg-transparent'
          }`}
          key={item.path}
          onClick={() => navigate(item.path)}
          type="button"
          aria-label={item.label}
        >
          {item.icon}
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
