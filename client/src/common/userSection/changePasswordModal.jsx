import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(144, 144, 144, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white'
  }
};

const ChangePasswordModal = ({
  isOpen,
  onClose,
  closeModal,
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
    contentLabel="Change Password Modal"
  >
    <div className="modal-header">
      <h4 className="modal-title" id="myModalLabel">ChangePassword</h4>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={closeModal}
      >
        <span aria-hidden="true" style={{ color: 'white' }}>&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <form>
        {
          error && <div>{ error }  </div>
        }
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <div className="input-group input-group">
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
          <div className="input-group input-group">
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
          <div className="input-group input-group">
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
  oldPasswordValue: PropTypes.string.isRequired,
  newPasswordValue: PropTypes.string.isRequired,
  confirmPasswordValue: PropTypes.string.isRequired,
  error: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
