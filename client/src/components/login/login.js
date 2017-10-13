import React from 'react';
import { MainHeader } from '../../views/index';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../actions/auth';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      hasErrored: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }


  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  handleChange(e) {

    this.setState({
      username: this.refs.username.value,
      password: this.refs.password.value
    });
  }

  handleLogin(e) {
    e.preventDefault();
    console.log('state: ', this.state);
    let { username, password } = this.state;
    if (username === '') {
      this.setState({
        hasErrored: true,
        errorMessage: 'Username cannot be  empty'
      });
    }
    else if (password === '') {
      this.setState({
        hasErrored: true,
        errorMessage: 'password cannot be empty'
      });
    }
    else if (username !== '' || password !== '') {
      this.setState({
        hasErrored: false,
        errorMessage: ''
      });
      this.props.loginUser({ username, password });
    }
    else {
      this.setState({
        hasErrored: true,
        errorMessage: 'Invalid Usernamer or Password'
      });
    }
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
                <h2><em><i>Login and start sharing recipes</i></em></h2>
              </section>
              <section className="col-md-5 account">
                <div>
                  <form className="login-form">
                    <h3 className="login-form-boxx">Login Form</h3>
                    <br></br>
                    <div className="form-group">
                      <label htmlFor="enterEmail">Username Or Email address:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-envelope"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Enter your username or email"
                          ref="username"
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
                          <i className="fa fa-unlock-alt"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Enter your password"
                          ref="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    {this.state.hasErrored ?
                      <p className="alert error-alert" style={{ color: 'white' }}>
                        <i className="fa fa-exclamation-triangle"></i>
                        &nbsp;{this.state.errorMessage}
                      </p> : ''
                    }
                    <div className="row">
                      <div className="checkbox-primary col-md-6">
                        <label>
                          <input type="checkbox" id="login-checkbox" /><span>Remember me</span>
                        </label>
                      </div>
                      <div className="text-right col-md-6">
                        <a href="#" data-toggle="modal" data-target="#myModal">Forgot your password?</a>
                      </div>
                    </div>
                    <div className="login-buttons">
                      <div>
                        <a href="#dashboard">
                          <button type="submit" className="btn btn-block btn-success" onClick={this.handleLogin}>Login</button>
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
                  <label htmlFor="enterEmailForgot">Email address:</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input name="textEmailAddress1" type="email" className="form-control" id="enterEmailForgot" placeholder="Enter email" />
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { loginUser })(Login);

