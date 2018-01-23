import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { resetPassword } from '../../actions/userActions';
import LoginForm from './LoginForm';
import RecoverPasswordModal from './RecoverPasswordModal';
import renderErrorAlert from '../../utils/renderErrorAlert';

/**
 * Login form commponent
 *
 * @class Login
 *
 * @extends {React.Component}
 */
class Login extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    modalErrorMessage: PropTypes.string
  };

  /**
   * constructor
   *
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
      modalErrorMessage: '',
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
   *
   * @memberOf Login
   *
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.status.length > 0) {
      this.setState({
        status: nextprops.status
      });
    }
  }

  /**
   * handle change form event
   *
   * @param {SytheticEvent} event
   *
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
   *
   * @param {sythenticElement} event
   *
   * @returns {*} void
   */
  handleLogin(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * opens forgotPasswordModal
   *
   * @param {SytheticEvent} event
   *
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
   *
   * @param {SytheticEvent} event
   *
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
        hasErrored: true,
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
   *
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
   * handle close modal event
   *
   * @returns {*} void
   */
  closeModal() {
    this.setState({
      email: '',
      modalIsOpen: false,
      hasErrored: false,
      errorMessage: '',
      status: ''
    });
  }

  /**
   * render
   *
   * @return {ReactElement} markup
   */
  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to="/dashboard/top-recipes" />);
    }
    return (
      <div>
        <div className="login-background">
          <div className="container">
            <div className="row landing">
              <section className="col-md-6 headline">
                <h1>Welcome to More recipes</h1>
                <h4>Share your recipe ideas with the world</h4>
                <br />
                <br />
                <h2>Login and start sharing recipes</h2>
              </section>
              <section className="col-md-1" />
              <section className="col-md-5 account">
                <LoginForm
                  username={this.state.username}
                  password={this.state.password}
                  openModal={this.openModal}
                  login={this.handleLogin}
                  error={
                    renderErrorAlert(
                      this.state.hasErrored,
                      this.props.errorMessage,
                      this.state.errorMessage, 'white'
                    )
                  }
                  onChange={this.handleChange}
                />
              </section>
            </div>
          </div>
        </div>
        {
            this.state.status === '' || this.state.status === 'Fail' ?
              <RecoverPasswordModal
                error={
                  renderErrorAlert(
                    this.state.hasErrored,
                    this.props.modalErrorMessage,
                    this.state.modalErrorMessage, 'white'
                  )
                }
                isOpen={this.state.modalIsOpen}
                onClose={this.closeModal}
                email={this.state.email}
                onChange={this.handleChange}
                resetPassword={this.handleResetPassword}
                errorMessage={this.state.errorMessage}
              /> : ''
          }
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
  isAuthenticated: state.auth.authenticated,
  status: state.user.status
});

export { Login as PureLogin };
export default connect(mapStateToProps, { loginUser, resetPassword })(Login);
