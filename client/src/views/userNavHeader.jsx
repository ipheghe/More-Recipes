import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsername, logoutUser } from '../actions/auth';
import { getUserCategories } from './../actions/category';
import Logo from '../../public/images/recipe_logo.png';

/**
 * UserNavHeader component
 * @class UserNavHeader
 * @extends {React.Component}
 */
class UserNavHeader extends React.Component {
  static propTypes = {
    fetchUsername: PropTypes.func.isRequired,
    getUserCategories: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
  };

	/**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
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
            <a className="navbar-brand" href="/">
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
                  <a className="nav-link" href={undefined}>
                    <span>
                      <i className="fa fa-bell" aria-hidden="true" />
                    </span>Notifications<span className="badge badge-pill badge-danger">2</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./profile.html">
                    <span>
                      <i className="fa fa-user" aria-hidden="true" />
                    </span> {this.props.userData.firstName} {this.props.userData.lastName}
                  </a>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={this.handleLogout}>
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

