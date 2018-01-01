import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const ChangePasswordModal = ({
  isOpen,
  onClose,
  closeModal,
  customStyles,
  error,
  oldPasswordValue,
  newPasswordValue,
  confirmPasswordValue,
  onChange,
  onUpdate
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div className="modal-header">
      <h4 className="modal-title" id="myModalLabel">ChangePassword</h4>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={closeModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <form>
        {
          error && <div>{ error }  </div>
        }
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">
              <i className="fa fa-unlock-alt" />
            </span>
            <input
              name="oldPassword"
              type="password"
              className="form-control"
              id="oldPassword"
              onChange={onChange}
              value={oldPasswordValue}
              placeholder="Enter old password"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">
              <i className="fa fa-unlock-alt" />
            </span>
            <input
              name="newPassword"
              type="password"
              className="form-control"
              id="newPassword"
              onChange={onChange}
              value={newPasswordValue}
              placeholder="Enter new passoword"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">
              <i className="fa fa-unlock-alt" />
            </span>
            <input
              name="confirmPassword"
              type="password"
              className="form-control"
              id="confirmPassword"
              onChange={onChange}
              value={confirmPasswordValue}
              placeholder="Confirm new passoword"
            />
          </div>
        </div>
      </form>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-success"
        onClick={onUpdate}
      > Modify
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={onClose}
      > Close
      </button>
    </div>
  </Modal>
);

ChangePasswordModal.defaultProps = {
  error: null
};

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  customStyles: PropTypes.objectOf(PropTypes.object).isRequired,
  oldPasswordValue: PropTypes.string.isRequired,
  newPasswordValue: PropTypes.string.isRequired,
  confirmPasswordValue: PropTypes.string.isRequired,
  error: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
