import React from "react";
import { MainHeader } from "../views/index";
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';

const form = reduxForm({
  form: 'register',
  validate,
});
const renderField = field => (
  <div>
    <input className="form-control" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);
function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (formProps.username.length < 4) {
    errors.password = 'username must be more than 3 characters';
  }

  return errors;
}

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      password: '',
      hasErrored: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }


  handleChange(e) {
    this.setState({
      username: this.refs.username.value,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      mobile: this.refs.mobile.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
    })
  }

  handleSignup(e) {
    e.preventDefault();
    console.log('state: ', this.state);
    let { username, firstName, lastName, mobile, email, password } = this.state;
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let numericExpression = /^[0-9]+$/;
    let regExpression = /^[A-Za-z][A-Za-z0-9-]+$/i;
    let valid;
    if (!valid) {
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
    const user = { username, firstName, lastName, mobile, email, password };
    return this.props.actions.signUpUser(this.state.username, this.state.firstName, this.state.lastName, this.state.mobile, this.state.email, this.state.password);
  }

  /**
   * @param {component} <MainHeader/> - The landing page main header navigation.
   * @param {component} <Register/> - The signup page of the app.
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
                    <h3 className="login-form-boxx">Registration Form</h3>
                    <br></br>
                    <div className="form-group">
                      <label for="enterUsername">Username:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user"></i>
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
                      <label for="enterFirstName">First Name:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user-o"></i>
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
                      <label for="enterLastName">Last Name:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user-o"></i>
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
                      <label for="enterMobile">Mobile:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-mobile"></i>
                        </span>
                        <input
                          name="mobile"
                          ref="mobile"
                          type="number"
                          className="form-control"
                          value={this.state.mobile}
                          onChange={this.handleChange}
                          placeholder="e.g 08034562838"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="enterEmail">Email address:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-envelope"></i>
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
                      <label for="enterPassword">Password:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-unlock-alt"></i>
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
                    {this.state.hasErrored ?
                      <p class="alert error-alert" style={{ color: 'white' }}>
                        <i className="fa fa-exclamation-triangle"></i>
                        &nbsp;{this.state.errorMessage}
                      </p> : ''
                    }
                    <div className="row">
                      <div className="col-md-6">
                        <a href="./login.html">Already have an account?</a>
                      </div>
                    </div>
                    <div className="login-buttons">
                      <div>
                        <a href="#login">
                          <button type="submit" className="btn btn-block btn-success" onClick={this.handleSignup}>Sign Up</button>
                        </a>
                      </div>
                      <br></br>
                      <div>
                        <a href="#">
                          <button type="button" className="btn btn-block btn-success">Cancel</button>
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Register);
