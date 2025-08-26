import {AiOutlineHome} from 'react-icons/ai'
import {RiSuitcase2Line} from 'react-icons/ri'
import {BiLogOut} from 'react-icons/bi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Footer = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props

    history.replace('/login')
  }

  const {activeNavbarItem} = props

  const activeHomeIconColor =
    activeNavbarItem === 'HOME' ? '#2563EB' : '#7A8493'

  const activeMyTripsIconColor =
    activeNavbarItem === 'MY_TRIPS' ? '#2563EB' : '#7A8493'

  return (
    <nav className="footer-navbar">
      <ul className="footer-navbar-list">
        <li>
          <Link to="/" className="link">
            <AiOutlineHome color={activeHomeIconColor} size="20" />
          </Link>
        </li>
        <li>
          <Link to="/my-trips" className="link">
            <RiSuitcase2Line color={activeMyTripsIconColor} size="20" />
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="footer-navbar-item-icon-button"
            onClick={onLogout}
          >
            <BiLogOut color="#7A8493" size="20" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Footer)
