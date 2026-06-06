import { navigate } from '../utils/navigation'

const navItems = [
  { path: '/', icon: '▦', label: '首页' },
  { path: '/stats', icon: '▣', label: '统计' },
  { path: '/profile', icon: '♟', label: '我的' },
]

function BottomNav({ active }) {
  return (
    <nav className="bottom-nav" aria-label="底部导航">
      {navItems.map((item) => (
        <button
          className={active === item.path ? 'is-active' : ''}
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
