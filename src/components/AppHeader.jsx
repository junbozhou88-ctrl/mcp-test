import { navigate } from '../utils/navigation'

function AppHeader({ compact = false }) {
  return (
    <header className={`app-header ${compact ? 'compact' : ''}`}>
      <button className="brand" type="button" onClick={() => navigate('/')}>
        <span className="brand-glyph">⌘</span>
        <span>ZenFlow</span>
      </button>
      <button className="avatar" type="button" onClick={() => navigate('/profile')} aria-label="个人中心">
        <span></span>
      </button>
    </header>
  )
}

export default AppHeader
