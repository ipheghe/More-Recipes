import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const RecoverPasswordModal = ({
  isOpen,
  onClose,
  customStyles,
  error,
  email,
  onChange,
  resetPassword
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div className="modal-header">
      <h4 className="modal-title" id="myModalLabel">Recover Password</h4>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={onClose}
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
          <label htmlFor="email">Email Address:</label>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">
              <i className="fa fa-envelope" />
            </span>
            <input
              name="email"
              type="email"
              className="form-control"
              onChange={onChange}
              value={email}
              placeholder="Enter email address"
            />
          </div>
        </div>
      </form>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-success"
        onClick={resetPassword}
      > Recover Password
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

RecoverPasswordModal.defaultProps = {
  error: null
};

RecoverPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customStyles: PropTypes.objectOf(PropTypes.object).isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default RecoverPasswordModal;
