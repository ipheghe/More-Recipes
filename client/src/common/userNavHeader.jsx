import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loaders';
import { connect } from 'react-redux';
import { fetchUsername, logoutUser } from '../actions/authActions';
import { getUserCategories } from './../actions/categoryActions';
import Logo from '../../public/assets/images/recipe_logo.png';

/**
 * UserNavHeader component
 * @class UserNavHeader
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class UserNavHeader extends React.Component {
  static propTypes = {
    fetchUsername: PropTypes.func.isRequired,
    getUserCategories: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    userData: PropTypes.shape({
      fullname: PropTypes.string,
    }).isRequired
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      isLoading: true
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
   * @memberOf UserNavHeader
   * @returns {*} void
   */
  componentDidMount() {
    this.props.fetchUsername();
    this.props.getUserCategories();
  }

  /**
   * @param {any} nextprops
   * @memberOf UserNavHeader
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.auth) {
      const { userData } = nextprops.state.auth;
      this.setState({
        userData: Object.assign({}, this.state.userData, userData),
        isLoading: false,
      });
    }
  }

  /**
   * handle change logout event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    if (this.state.isLoading) return (<Loader type="ball-scale-ripple-multiple" active />);
    return (
      <div>
        <header>
          <nav
            className="navbar navbar-toggleable-md fixed-top navbar-light bg-faded"
            id="brand-color"
          >
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <a className="navbar-brand">
              <img
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="logo"
              />
              MoreRecipes
            </a>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
              style={{ float: 'right' }}
            >
              <ul className="navbar-nav mr-auto" />
              <ul className="nav justify-content-end" id="profile-nav">
                <li className="nav-item">
                  <button
                    className="nav-link invisible-button"
                    onClick={() => {
                    window.location.hash = '/dashboard';
                  }}
                  >
                    <span>
                      <i className="fa fa-user" aria-hidden="true" />
                    </span> {this.state.userData.fullName}
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link invisible-button" onClick={this.handleLogout}>
                    <span>
                      <i className="fa fa-sign-out" aria-hidden="true" />
                    </span> Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userData: state.auth.userData,
});

export default connect(mapStateToProps, {
  fetchUsername,
  logoutUser,
  getUserCategories
})(UserNavHeader);

