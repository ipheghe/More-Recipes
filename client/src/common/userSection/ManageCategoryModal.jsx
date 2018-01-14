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


const ManageCategoryModal = ({
  isOpen,
  onClose,
  closeModal,
  value,
  onChange,
  onUpdate,
  onDelete
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={customStyles}
    contentLabel="Manage Category Modal"
  >
    <div className="modal-header">
      <h4 className="modal-title" id="myModalLabel">Manage Category</h4>
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
      <div className="form-group">
        <label htmlFor="enterEmailForgot">Category Name:</label>
        <div className="input-group input-group">
          <span className="input-group-addon">
            <i className="fa fa-envelope" />
          </span>
          <input
            name="modalCategoryName"
            type="text"
            className="form-control"
            value={value}
            onChange={onChange}
            required
          />
        </div>
      </div>
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
        onClick={onDelete}
      > Delete
      </button>
    </div>
  </Modal>
);

ManageCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ManageCategoryModal;
