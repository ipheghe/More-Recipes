import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoginForm = ({
  username,
  password,
  openModal,
  login,
  error,
  onChange
}) => (
  <div>
    <form className="login-form">
      {
        error && <div>{ error }  </div>
      }
      <h3 className="login-form-boxx">Login Form</h3>
      <br />
      <div className="form-group">
        <label htmlFor="enterEmail">Username:</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-user-secret" />
          </span>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={onChange}
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
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={onChange}
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
            onClick={openModal}
          >Forgot your password?
          </button>
        </div>
      </div>
      <div className="login-buttons">
        <div>
          <a href="#dashboard">
            <button
              id="login"
              className="btn btn-block btn-success"
              onClick={login}
            >Login
            </button>
          </a>
        </div>
        <br />
        <div>
          <Link to="/signup"className="btn btn-block btn-success home" >Sign Up</Link>
        </div>
      </div>
    </form>
  </div>
);

LoginForm.defaultProps = {
  error: null
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default LoginForm;
