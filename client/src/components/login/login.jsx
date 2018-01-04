import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MainHeader, Footer } from '../../common';
import { loginUser } from '../../actions/authActions';
import { resetPassword } from '../../actions/userActions';
import RecoverPasswordModal from './recoverPasswordModal.jsx';

/**
 * Login form commponent
 * @class Login
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class Login extends React.Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    modalErrorMessage: PropTypes.string
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
      modalIsOpen: false,
      status: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * @param {any} nextprops
   * @memberOf UserSection
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.user.status.length > 0) {
      this.setState({
        status: nextprops.state.user.status
      });
    }
  }

  /**
   * handle change form event
   * @param {SytheticEvent} event
   * @returns {object} state
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handle login form event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleLogin(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * opens forgotPasswordModal
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  openModal(event) {
    event.preventDefault();
    this.setState({
      modalIsOpen: true
    });
  }

  /**
   * handle Reset password form event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleResetPassword(event) {
    event.preventDefault();
    if (this.state.email === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        errorMessage: 'email field cannot be empty'
      });
    }
    this.setState({
      email: '',
      hasErrored: false,
      errorMessage: ''
    });
    this.props.resetPassword(this.state.email);
  }

  /**
   * validateFormField
   * @returns {string} errorMessage
   */
  validateFormField() {
    const { username, password } = this.state;
    if (username === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'Username field cannot be  empty'
      });
    }
    if (password === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'password field cannot be empty'
      });
    }


    return this.props.loginUser({ username, password });
  }

  /**
   * handle after open modal event
   * @returns {*} void
   */
  afterOpenModal() {
    this.subtitle.style.color = '#252A2D';
  }

  /**
   * handle close modal event
   * @returns {*} void
   */
  closeModal() {
    this.setState({
      email: '',
      modalIsOpen: false,
      hasErrored: false,
      errorMessage: '',
      status: 'Success'
    });
  }

  /**
   * handle login form event error
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
   * handle recover password form event error
   * @returns {string} errorMessage
   */
  renderModalAlert() {
    if (this.state.hasErrored) {
      return (
        <div>
          <p className="alert error-alert">
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
            &nbsp;{this.state.errorMessage}
          </p>
        </div>
      );
    } else if (this.props.modalErrorMessage) {
      return (
        <div>
          <p className="alert error-alert">
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
            &nbsp;{this.props.modalErrorMessage}
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
    const customStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
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
                          placeholder="Enter your username"
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
                          style={{ color: '#2F94D2' }}
                          onClick={this.openModal}
                        >Forgot your password?
                        </button>
                      </div>
                    </div>
                    <div className="login-buttons">
                      <div>
                        <a href="#dashboard">
                          <button
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
        {
          this.state.status === '' || this.state.status === 'Fail' ?
            <RecoverPasswordModal
              error={this.renderModalAlert()}
              isOpen={this.state.modalIsOpen}
              onClose={this.closeModal}
              customStyles={customStyles}
              email={this.state.email}
              onChange={this.handleChange}
              resetPassword={this.handleResetPassword}
              errorMessage={this.state.errorMessage}
            /> : ''
        }
        <Footer />
      </div>
    );
  }
}

Login.defaultProps = {
  errorMessage: '',
  modalErrorMessage: ''
};

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  modalErrorMessage: state.user.error,
});


export default connect(mapStateToProps, { loginUser, resetPassword })(Login);
