import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {isMenuClicked: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderHamburgerMenu = () => {
    console.log('hambrgr  menu clicked ')
    this.setState(prevState => ({isButtonClicked: !prevState.isButtonClicked}))
  }

  closeMenu = () => {
    this.setState({isButtonClicked: false})
  }

  renderMenu = () => {
    console.log('render menu called')
    return (
      <ul className="nav-menu-list-mobile">
        <Link to="/">
          <li className="nav-menu-item-mobile">Home</li>
        </Link>
        <Link to="/shelf">
          <li className="nav-menu-item-mobile">BookShelves</li>
        </Link>
        <button
          type="button"
          className="logout-mobile-btn"
          onClick={this.onClickLogout}
        >
          Logout
        </button>

        <AiFillCloseCircle
          className="cross-icon-style"
          onClick={this.closeMenu}
        />
      </ul>
    )
  }

  render() {
    const {isButtonClicked} = this.state
    return (
      <>
        <nav className="nav-header">
          <Link to="/">
            <img
              className="home-logo"
              src="https://res.cloudinary.com/dp7ibjh2t/image/upload/v1643911378/BookHub/Bkhub_title_b9mwj8.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <Link to="/" className="nav-link">
              <li className="nav-menu-item">Home</li>
            </Link>
            <Link to="/shelf" className="nav-link">
              <li className="nav-menu-item">BookShelves</li>
            </Link>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </ul>
          <button
            type="button"
            onClick={this.renderHamburgerMenu}
            className="hamburger-icon"
          >
            <GiHamburgerMenu />
          </button>
        </nav>
        <div className="ham-menu-display">
          {isButtonClicked ? this.renderMenu() : null}
        </div>
      </>
    )
  }
}
export default withRouter(Header)
