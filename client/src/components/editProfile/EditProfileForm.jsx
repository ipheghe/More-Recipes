import React from 'react';
import PropTypes from 'prop-types';

const EditProfileForm = ({
  username,
  fullName,
  mobileNumber,
  email,
  updateProfile,
  error,
  onChange
}) => (
  <div>
    <form className="reg-form">
      {
        error && <div>{ error }  </div>
      }
      <div className="form-group">
        <label htmlFor="enterUsername">Username:</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-user" />
          </span>
          <input
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
            <i className="fa fa-user-o" />
          </span>
          <input
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
      <div className="edit-profile-button">
        <button
          className="btn btn-success"
          onClick={updateProfile}
        >Update
        </button>
        <a href="#dashboard"><button type="button" className="btn btn-danger">Cancel</button></a>
      </div>
    </form>
  </div>
);

EditProfileForm.defaultProps = {
  error: null
};

EditProfileForm.propTypes = {
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default EditProfileForm;
