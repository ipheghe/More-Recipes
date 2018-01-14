import React from 'react';
import PropTypes from 'prop-types';

const ResetPasswordForm = ({
  newPassword,
  confirmPassword,
  resetPassword,
  error,
  onChange
}) => (
  <div>
    <form className="login-form">
      {
          error && <div>{ error }  </div>
      }
      <h3 className="login-form-boxx">Update Password</h3>
      <br />
      <div className="form-group">
        <label htmlFor="enterPassword">New Password:</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-unlock-alt" />
          </span>
          <input
            type="password"
            className="form-control"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="enterPassword">Confirm Password:</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-unlock-alt" />
          </span>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="login-buttons">
        <div>
          <a>
            <button
              className="btn btn-block btn-success"
              onClick={resetPassword}
            >Change Password
            </button>
          </a>
        </div>
        <br />
      </div>
    </form>
  </div>
);

ResetPasswordForm.defaultProps = {
  error: null
};

ResetPasswordForm.propTypes = {
  newPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  error: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
