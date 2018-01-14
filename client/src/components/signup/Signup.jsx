import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MainHeader, Footer } from '../../common';
import { registerUser } from '../../actions/authActions';
import SignupForm from './SignupForm.jsx';

/**
 * signUp form commponent
 *
 * @class SignUp
 *
 * @extends {React.Component}
 */
class SignUp extends React.Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
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
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const numericExpression = /^[0-9]+$/;
    const regExpression = /^[A-Za-z][A-Za-z0-9-]+$/i;
    setTimeout(() => {
      this.setState({
        hasErrored: false,
        errorMessage: ''
      });
    }, 3000);
    if (!username.match(regExpression)) {
      return this.setState({
        hasErrored: true,
        errorMessage: 'Username must start with a letter and have no spaces.'
      });
    }
    if (fullName.length < 4) {
      return this.setState({
        hasErrored: true,
        errorMessage: 'fullname must contain more than 3 chareacters'
      });
    }
    if (!mobileNumber.match(numericExpression)) {
      return this.setState({
        hasErrored: true,
        errorMessage: 'mobile number must contain only numbers'
      });
    }
    if (!mobileNumber === '') {
      return this.setState({
        hasErrored: true,
        errorMessage: 'mobile numberfield cannot be empty'
      });
    }
    if (reg.test(email) === false) {
      return this.setState({
        hasErrored: true,
        errorMessage: 'Invalid Email Address'
      });
    }
    if (password < 8) {
      return this.setState({
        hasErrored: true,
        errorMessage: 'password must contain more than 7 chareacters'
      });
    }
    this.setState({
      hasErrored: false,
      errorMessage: ''
    });
    return this.props.registerUser({
      username,
      password,
      fullName,
      mobileNumber,
      email
    });
  }

  /**
   * handle signUp form event error
   *
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
   *
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
                <h2>Sign Up and start sharing recipes</h2>
              </section>
              <section className="col-md-5 account">
                <SignupForm
                  username={this.state.username}
                  password={this.state.password}
                  fullName={this.state.fullName}
                  mobileNumber={this.state.mobileNumber}
                  email={this.state.email}
                  signup={this.handleSignup}
                  error={this.renderAlert()}
                  onChange={this.handleChange}
                />
              </section>
              <br />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SignUp.defaultProps = {
  errorMessage: ''
};

const mapStateToProps = state => ({
  errorMessage: state.auth.error
});

export default connect(mapStateToProps, { registerUser })(SignUp);
