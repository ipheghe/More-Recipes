class BasicForm extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      username: 'jasonmalfatto@moduscreate.com',
      password: '',
      passwordConfirm: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    e.target.classList.add('active');
    
    this.setState({
      [e.target.name]: e.target.value
    });
    
    this.showInputError(e.target.name);
  }
  import React from "react";
import { MainHeader } from "../views/index";
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onLoginUser from '../actions/index';
import api from './helpers/api';
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { Field, reduxForm } from 'redux-form';  
import { registerUser } from '../actions';
import * as sessionActions from '../actions/sessionActions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username:'', 
      password:'',
      hasErrored: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {

    this.setState({
        username: this.refs.username.value,
        password: this.refs.password.value
    })
  }
  
  handleLogin(e) {
    e.preventDefault();
    console.log('state: ', this.state);
    let {username, password} = this.state;
    if (username === '') {
      this.setState({
        hasErrored: true,
        errorMessage: 'Username cannot be  empty' });
    }
    else if (password === '') {
      this.setState({
        hasErrored: true,
        errorMessage: 'password cannot be empty' });
    }
    else if (username !== '' || password !== '') {
      this.props.actions.logInUser(this.state.username, this.state.password);
    } 
    else {
      this.setState({
        hasErrored: true,
        errorMessage: 'Invalid Usernamer or Password' });
    }
  }

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
                <h2><em><i>Login and start sharing recipes</i></em></h2>
              </section>
              <section className="col-md-5 account">
              <div>
                <form  className="login-form" id="auth-form" onSubmit={ this.handleSubmit }>
                  <h3 className="login-form-boxx">Login Form</h3>
                  <br></br>
                      <div className="form-group">
                          <label for="enterEmail">Username Or Email address:</label>
                          <div className="input-group">
                              <span className="input-group-addon">
                                  <i className="fa fa-envelope"></i>
                              </span>
                              <input
                                type="text"
                                class="form-control" 
                                name="username"
                                placeholder="Enter your username or email"
                                ref="username"
                                value={ this.state.username }
                                onChange={ this.handleChange }
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
                                type="password"
                                class="form-control" 
                                name="password"
                                placeholder="Enter your password"
                                ref="password"
                                value={ this.state.password }
                                onChange={ this.handleChange }
                              />  
                          </div>
                      </div>
                        {this.state.hasErrored ?
                        <p class="alert error-alert" style={{color:'white'}}>
                          <i className="fa fa-exclamation-triangle"></i>
                          &nbsp;{this.state.errorMessage}
                        </p> : ''
                      }
                      <div className="row">
                          <div className="checkbox-primary col-md-6">
                              <label>
                                  <input type="checkbox" id="login-checkbox"/><span>Remember me</span>
                              </label>
                          </div>
                          <div className="text-right col-md-6">
                            <a href="#" data-toggle="modal" data-target="#myModal">Forgot your password?</a>
                          </div>
                      </div>
                    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header"> 
                          <h5 className="modal-title col-md-6" id="exampleModalLabel">Forgot Password?</h5>
                          <button type="button" className="close col-md-6" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">         
                                  <div className="form-group">
                                      <label for="enterEmailForgot">Email address:</label>
                                      <div className="input-group input-group-lg">
                                          <span className="input-group-addon">
                                              <i className="fa fa-envelope"></i>
                                          </span>
                                          <input name="textEmailAddress1" type="email" className="form-control" id="enterEmailForgot" placeholder="Enter email"/>
                                      </div>
                                  </div>     
                            </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-success" data-dismiss="modal">Recover Password</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="login-buttons">
                  <div>
                    <a href="#dashboard">
                        <button type="submit" className="btn btn-block btn-success" onClick={ this.handleLogin }>Login</button>
                    </a>
                  </div>
                  <br></br>
                  <div>
                    <a href="#register">
                        <button type="button" className="btn btn-block btn-success">Sign Up</button>
                    </a>
                    </div>
                  </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Login);

  handleSubmit(e) {    
    e.preventDefault();
    
    console.log('component state', JSON.stringify(this.state));
    
    if (!this.showFormErrors()) {
      console.log('form is invalid: do not submit');
    } else {
      console.log('form is valid: submit');
    }
  }
  
  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    
    inputs.forEach(input => {
      input.classList.add('active');
      
      const isInputValid = this.showInputError(input.name);
      
      if (!isInputValid) {
        isFormValid = false;
      }
    });
    
    return isFormValid;
  }
  
  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
    const isPasswordConfirm = refName === 'passwordConfirm';
    
    if (isPasswordConfirm) {
      if (this.refs.password.value !== this.refs.passwordConfirm.value) {
        this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
      } else {
        this.refs.passwordConfirm.setCustomValidity('');
      }
    }
        
    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`; 
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`; 
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be longer than 4 chars`; 
      } else if (isPasswordConfirm && validity.customError) {
        error.textContent = 'Passwords do not match';
      }
      return false;
    }
    
    error.textContent = '';
    return true;
  }

  render() {
    return (
      <form novalidate>
        <div className="form-group">
          <label id="usernameLabel">Username</label>
          <input className="form-control"
            type="email"
            name="username"
            ref="username"
            value={ this.state.username } 
            onChange={ this.handleChange }
            required />
          <div className="error" id="usernameError" />
        </div>
        <div className="form-group">
          <label id="passwordLabel">Password</label>
          <input className="form-control"
            type="password" 
            name="password"
            ref="password"
            value={ this.state.password } 
            onChange={ this.handleChange }
            pattern=".{5,}"
            required />
          <div className="error" id="passwordError" />
        </div>
        <div className="form-group">
          <label id="passwordConfirmLabel">Confirm Password</label>
          <input className="form-control"
            type="password" 
            name="passwordConfirm"
            ref="passwordConfirm"
            value={ this.state.passwordConfirm } 
            onChange={ this.handleChange }
            required />
          <div className="error" id="passwordConfirmError" />
        </div>
        <button className="btn btn-primary"
          onClick={ this.handleSubmit }>submit</button>
      </form>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <BasicForm />
        <p className="note">Note: see console for submit event logging</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));