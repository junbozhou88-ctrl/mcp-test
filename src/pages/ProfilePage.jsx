import AppHeader from '../components/AppHeader'
import BottomNav from '../components/BottomNav'

function ProfilePage() {
  return (
    <div className="screen profile-screen">
      <AppHeader />

      <section className="profile-card">
        <div className="portrait">
          <span></span>
          <button type="button">✎</button>
        </div>
        <h1>林深</h1>
        <p>ZEN EXPLORER · LV.12</p>
      </section>

      <section className="streak">
        <strong>24</strong>
        <span>连续专注天数</span>
      </section>

      <div className="settings-list">
        <button type="button">
          <span>♙</span>
          账号与安全
          <i>›</i>
        </button>
        <button type="button">
          <span>☊</span>
          帮助与反馈
          <i>›</i>
        </button>
      </div>

      <small className="version">ZENFLOW VERSION 2.4.0</small>
      <BottomNav active="/profile" />
    </div>
  )
}

export default ProfilePage
