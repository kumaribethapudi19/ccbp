import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const renderHamburgerMenu = () => {
    console.log('hambrgr  menu clicked ')
    return (
      <div id="hamburger-menu-expanded">
        <ul className="nav-menu-list-mobile">
          <Link to="/">
            <li className="nav-menu-item-mobile">Home</li>
          </Link>
          <Link to="/shelves">
            <li className="nav-menu-item-mobile">BookShelves</li>
          </Link>
          <button
            type="button"
            className="logout-mobile-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
          <AiFillCloseCircle />
        </ul>
      </div>
    )
  }

  return (
    <>
      <nav className="nav-header">
        <div className="nav-content">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dp7ibjh2t/image/upload/v1643911378/BookHub/Bkhub_title_b9mwj8.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <Link to="/" className="nav-link">
              <li>Home</li>
            </Link>
            <Link to="/shelves" className="nav-link">
              <li>BookShelves</li>
            </Link>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </ul>
        </div>
        <div className="nav-menu-mobile">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dp7ibjh2t/image/upload/v1643911378/BookHub/Bkhub_title_b9mwj8.png"
              alt="website logo"
            />
          </Link>

          <button onClick={renderHamburgerMenu} className="hamburger-icon">
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>
      <div className="ham-menu-display">{renderHamburgerMenu()}</div>
    </>
  )
}
export default withRouter(Header)
