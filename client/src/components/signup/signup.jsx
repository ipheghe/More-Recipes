import React from 'react';
import PropTypes from 'prop-types';
import { MainHeader } from '../../views/index';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';

/**
 * signUp form commponent
 * @class SignUp
 * @extends {React.Component}
 */
class SignUp extends React.Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
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
      firstName: '',
      lastName: '',
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
   * @param {SytheticEvent} e
   * @returns {object} state
   */
  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.refs.username.value,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      mobileNumber: this.refs.mobileNumber.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
    });
  }

  /**
   * handle signUp form event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleSignup(e) {
    e.preventDefault();
    const {
      username,
      firstName,
      lastName,
      mobileNumber,
      email,
      password
    } = this.state;
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const numericExpression = /^[0-9]+$/;
    const regExpression = /^[A-Za-z][A-Za-z0-9-]+$/i;
    let valid;
    if (!valid) {
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
      if (firstName.length < 4) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'firstName must contain more than 3 chareacters'
        });
      }
      if (firstName.match(numericExpression)) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'firstName must contain only alphabets'
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
      if (lastName.lenght < 4) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'lastName must contain more than 4 chareacters'
        });
      }
      if (lastName.match(numericExpression)) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'firstName must contain only alphabets'
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
    }
    return this.props.registerUser({
      username,
      password,
      firstName,
      lastName,
      mobileNumber,
      email
    });
  }

  /**
   * handle signUp form event error
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
                <br></br>
                <br></br>
                <h2><em><i>Sign Up and start sharing recipes</i></em></h2>
              </section>
              <section className="col-md-5 account">
                <div>
                  <form className="reg-form">
                    {this.renderAlert()}
                    <h3 className="login-form-boxx">Registration Form</h3>
                    <br></br>
                    <div className="form-group">
                      <label htmlFor="enterUsername">Username:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user" />
                        </span>
                        <input
                          name="username"
                          ref="username"
                          type="text"
                          className="form-control"
                          value={this.state.username}
                          onChange={this.handleChange}
                          placeholder="e.g john112"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="enterFirstName">First Name:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user-o" />
                        </span>
                        <input
                          name="firstName"
                          ref="firstName"
                          type="text"
                          className="form-control"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                          placeholder="e.g John"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="enterLastName">Last Name:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user-o" />
                        </span>
                        <input
                          name="lastName"
                          ref="lastName"
                          type="text"
                          className="form-control"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                          placeholder="e.g Ken"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="enterMobile">Mobile:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-mobile" />
                        </span>
                        <input
                          name="mobileNumber"
                          ref="mobileNumber"
                          type="number"
                          className="form-control"
                          value={this.state.mobileNumber}
                          onChange={this.handleChange}
                          placeholder="e.g 08034562838"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="enterEmail">Email address:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-envelope" />
                        </span>
                        <input
                          name="email"
                          ref="email"
                          type="email"
                          className="form-control"
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="e.g john@yahoo.com"
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
                          name="password"
                          ref="password"
                          type="password"
                          className="form-control"
                          value={this.state.password}
                          onChange={this.handleChange}
                          placeholder=""
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <a href="#login">Already have an account?</a>
                      </div>
                    </div>
                    <div className="login-buttons">
                      <div>
                        <a href="#login">
                          <button
                            type="submit"
                            className="btn btn-block btn-success"
                            onClick={this.handleSignup}
                          >Sign Up
                          </button>
                        </a>
                      </div>
                      <br></br>
                      <div>
                        <a href="/">
                          <button
                            type="button"
                            className="btn btn-block btn-success"
                          >Cancel
                          </button>
                        </a>
                      </div>
                    </div>
                  </form>
                  <br></br>
                </div>
              </section>
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

export default connect(mapStateToProps, { registerUser })(SignUp);
