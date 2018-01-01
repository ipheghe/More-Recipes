import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const ManageCategoryModal = ({
  isOpen,
  afterOpen,
  onClose,
  closeModal,
  customStyles,
  value,
  onChange,
  onUpdate,
  onDelete,
  refName
}) => (
  <Modal
    isOpen={isOpen}
    onAfterOpen={afterOpen}
    onRequestClose={onClose}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div className="modal-header">
      <h4 className="modal-title" id="myModalLabel" ref={refName}>Manage Category</h4>
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
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="enterEmailForgot">Category Name:</label>
          <div className="input-group input-group-lg">
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
  afterOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  customStyles: PropTypes.objectOf(PropTypes.object).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  refName: PropTypes.func.isRequired
};

export default ManageCategoryModal;
