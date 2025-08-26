import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props

    history.replace('/login')
  }

  const {activeNavbarItem} = props

  const activeNavbarItemHome =
    activeNavbarItem === 'HOME' ? 'active-navbar-item-home' : ''

  const activeNavbarItemMyTrips =
    activeNavbarItem === 'MY_TRIPS' ? 'active-navbar-item-my-trips' : ''

  return (
    <nav className="header-navbar">
      <Link to="/" className="link">
        <h1 className="header-navbar-website-logo">Travel Trip</h1>
      </Link>
      <ul className="header-navbar-list">
        <Link to="/" className="link">
          <li className={`header-navbar-item ${activeNavbarItemHome}`}>Home</li>
        </Link>
        <Link to="/my-trips" className="link">
          <li className={`header-navbar-item ${activeNavbarItemMyTrips}`}>
            My Trips
          </li>
        </Link>
      </ul>
      <button
        type="button"
        className="header-navbar-logout-button"
        onClick={onLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
