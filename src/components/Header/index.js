import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {RiCloseCircleFill} from 'react-icons/ri'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

class Header extends Component {
  state = {showHiddenNav: false}

  onClickCrossButton = () => {
    this.setState({showHiddenNav: false})
  }

  onClickLogoutButton = () => {
    const {history} = this.props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickHamburgerMenu = () => {
    this.setState(prevState => ({
      showHiddenNav: !prevState.showHiddenNav,
    }))
  }

  render() {
    const {showHiddenNav} = this.state
    return (
      <div>
        <nav className="nav-header">
          <div className="nav-content">
            <div className="nav-bar-large-container">
              <Link to="/">
                <img
                  className="logo-image"
                  alt="website logo"
                  src="https://res.cloudinary.com/dtayp31ut/image/upload/v1671001807/login-logo_l2egwj.jpg"
                />
              </Link>
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-menu-item">
                  <Link to="/shelf" className="nav-link">
                    Bookshelves
                  </Link>
                </li>
              </ul>
              <button
                onClick={this.onClickLogoutButton}
                type="button"
                className="logout-desktop-btn"
              >
                Logout
              </button>
            </div>

            <div className="nav-bar-mobile-logo-container">
              <Link to="/">
                <img
                  onClick={this.onClickWebSiteLogo}
                  className="website-logo"
                  src="https://res.cloudinary.com/dtayp31ut/image/upload/v1671001807/login-logo_l2egwj.jpg"
                  alt="website logo"
                />
              </Link>

              <button
                onClick={this.onClickHamburgerMenu}
                className="hamburger-icon-button"
                type="button"
              >
                <GiHamburgerMenu size="30" />
              </button>
            </div>
          </div>
        </nav>
        {showHiddenNav && (
          <>
            <div className="hidden-Nav-bar-tabs">
              <Link to="/">
                <h1 className="mobile-nav-link">Home</h1>
              </Link>
              <Link to="/shelf">
                <h1 className="mobile-nav-link">BookShelves</h1>
              </Link>
              <button
                onClick={this.onClickLogoutButton}
                className="mobile-logout-btn"
                type="button"
              >
                Logout
              </button>
              <button
                onClick={this.onClickCrossButton}
                className="cross-icon-btn"
                type="button"
              >
                <RiCloseCircleFill size="30" />
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}
export default withRouter(Header)
