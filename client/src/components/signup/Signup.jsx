import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import SignupForm from './SignupForm.jsx';
import renderErrorAlert from '../../utils/renderErrorAlert';
import signupValidator from '../../utils/validator/signupValidator';

/**
 * signup form commponent
 *
 * @class Signup
 *
 * @extends {React.Component}
 */
class Signup extends React.Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
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
      fullName: '',
      mobileNumber: '',
      email: '',
      password: '',
      hasErrored: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
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
   * handle signUp form event
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  handleSignup(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * validateFormField
   *
   * @returns {string} errorMessage
   */
  validateFormField() {
    const {
      username,
      fullName,
      mobileNumber,
      email,
      password
    } = this.state;

    const error = signupValidator(
      username,
      fullName,
      mobileNumber,
      email,
      password
    );

    if (error.status === true) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: error.status,
        errorMessage: error.message
      });
    }

    return this.props.registerUser({
      username,
      password,
      fullName,
      mobileNumber,
      email
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
                <h2>Sign Up and start sharing recipes</h2>
              </section>
              <section className="col-md-1" />
              <section className="col-md-5 account">
                <SignupForm
                  username={this.state.username}
                  password={this.state.password}
                  fullName={this.state.fullName}
                  mobileNumber={this.state.mobileNumber}
                  email={this.state.email}
                  signup={this.handleSignup}
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
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.defaultProps = {
  errorMessage: ''
};

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  isAuthenticated: state.auth.authenticated
});

export { Signup as PureSignup };
export default connect(mapStateToProps, { registerUser })(Signup);
