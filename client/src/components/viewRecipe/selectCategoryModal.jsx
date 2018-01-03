import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const SelectCategoryModal = ({
  isOpen,
  onClose,
  customStyles,
  categories,
  categoryInput,
  favoriteRecipe
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div className="modal-header">
      <h4 className="modal-title" id="myModalLabel">Select Category</h4>
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
      <div className="form-group">
        <label htmlFor="category-list">Select Category</label>
        <select
          type="text"
          className="form-control"
          name="categoryName"
          ref={categoryInput}
        >
          {
        (categories && categories.length > 0) ?
          categories.map(category =>
            <option value={category.id} key={category.id} >{category.name}</option>)
          : null
      }
        </select>
      </div>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-success"
        onClick={favoriteRecipe}
      > Favorite Recipe
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

SelectCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customStyles: PropTypes.objectOf(PropTypes.object).isRequired,
  categoryInput: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteRecipe: PropTypes.func.isRequired,
};

export default SelectCategoryModal;
