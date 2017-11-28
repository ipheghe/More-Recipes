import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MainHeader } from '../../views/index';
import { loginUser } from '../../actions/auth';
import { resetPassword } from '../../actions/userActions';

/**
 * Login form commponent
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      hasErrored: false,
      errorMessage: '',
      modalError: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
  }

  /**
   * handle change form event
   * @param {SytheticEvent} e
   * @returns {object} state
   */
  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * handle login form event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const valid = false;
    if (valid) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      if (username === '') {
        return this.setState({
          hasErrored: true,
          errorMessage: 'Username field cannot be  empty'
        });
      }
      if (password === '') {
        return this.setState({
          hasErrored: true,
          errorMessage: 'password field cannot be empty'
        });
      }
    } else {
      return this.props.loginUser({ username, password });
    }
  }

  /**
   * handle Reset password form event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleResetPassword(e) {
    e.preventDefault();
    if (this.state.email === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          modalError: ''
        });
      }, 3000);
      return this.setState({
        modalError: 'email field cannot be empty'
      });
    }
    this.setState({
      email: '',
    });
    this.props.resetPassword(this.state.email);
  }

  /**
   * handle login form event error
   * @param {SytheticEvent} e
   * @returns {string} errorMessage
   */
  renderAlert() {
    if (this.state.hasErrored) {
      return (
        <div>
          <p className="alert error-alert" style={{ color: 'white' }}>
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
            &nbsp;{this.state.errorMessage}
          </p>
        </div>
      );
    } else if (this.props.errorMessage) {
      return (
        <div>
          <p className="alert error-alert" style={{ color: 'white' }}>
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
            &nbsp;{this.props.errorMessage}
          </p>
        </div>
      );
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div>
        <MainHeader />
        <div className="login-background">
          <div className="container">
            <div className="row landing">
              <section className="col-md-7 headline">
                <h1>Welcome to More recipes</h1>
                <h4>Share your recipe ideas with the world</h4>
                <br />
                <br />
                <h2><em><i>Login and start sharing recipes</i></em></h2>
              </section>
              <section className="col-md-5 account">
                <div>
                  <form className="login-form">
                    {this.renderAlert()}
                    <h3 className="login-form-boxx">Login Form</h3>
                    <br />
                    <div className="form-group">
                      <label htmlFor="enterEmail">Username:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-envelope" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Enter your username or email"
                          value={this.state.username}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="enterPassword">Password:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-unlock-alt" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Enter your password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="checkbox-primary col-md-6">
                        <label>
                          <input type="checkbox" id="login-checkbox" /><span>Remember me</span>
                        </label>
                      </div>
                      <div className="text-right col-md-6">
                        <button
                          className="invisible-button"
                          data-toggle="modal"
                          data-target="#myModal"
                          style={{ color: '#2F94D2' }}
                        >Forgot your password?
                        </button>
                      </div>
                    </div>
                    <div className="login-buttons">
                      <div>
                        <a href="#dashboard">
                          <button
                            type="submit"
                            className="btn btn-block btn-success"
                            onClick={this.handleLogin}
                          >Login
                          </button>
                        </a>
                      </div>
                      <br />
                      <div>
                        <a href="#signup">
                          <button
                            type="button"
                            className="btn btn-block btn-success"
                          >Sign Up
                          </button>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">Forgot Password?</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {(this.props.message) ?
                  <p className="alert error-alert">
                    <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
                    &nbsp;{this.props.message}
                  </p> : this.state.modalError
                }
                <div className="form-group">
                  <label htmlFor="enterEmailForgot">Email address:</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope" />
                    </span>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      onChange={this.handleChange}
                      value={this.state.email}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleResetPassword}
                >
                  Recover Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  message: state.user.error,
});


export default connect(mapStateToProps, { loginUser, resetPassword })(Login);
