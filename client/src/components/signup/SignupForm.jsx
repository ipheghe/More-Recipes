import React from 'react';
import PropTypes from 'prop-types';

/**
 * SignupForm component
 *
 * @param {Object} props
 *
 * @return {jsx} jsx
 */
const SignupForm = ({
  username,
  password,
  fullName,
  mobileNumber,
  email,
  signup,
  error,
  onChange
}) => (
  <div>
    <form className="reg-form">
      {
        error && <div>{ error }  </div>
      }
      <h3 className="login-form-boxx">Registration Form</h3>
      <br />
      <div className="form-group">
        <label htmlFor="enterUsername">Username:</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-user-secret" />
          </span>
          <input
            id="username"
            name="username"
            type="text"
            className="form-control"
            value={username}
            onChange={onChange}
            placeholder="e.g john112"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="enterFullName">Full Name:</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-user" />
          </span>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="form-control"
            value={fullName}
            onChange={onChange}
            placeholder="e.g John James"
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
            id="mobileNumber"
            name="mobileNumber"
            type="number"
            className="form-control"
            value={mobileNumber}
            onChange={onChange}
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
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={email}
            onChange={onChange}
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
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={password}
            onChange={onChange}
            placeholder=""
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <a href="#login" className="have-account">Already have an account?</a>
        </div>
      </div>
      <div className="login-buttons">
        <div>
          <a>
            <button
              className="btn btn-block btn-success"
              id="signup"
              onClick={signup}
            >Sign Up
            </button>
          </a>
        </div>
      </div>
    </form>
  </div>
);

SignupForm.defaultProps = {
  error: null
};

SignupForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
};

export default SignupForm;
