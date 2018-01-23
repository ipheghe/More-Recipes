import React from 'react';
import PropTypes from 'prop-types';

/**
 * AddRecipeForm component
 *
 * @param {Object} props
 *
 * @return {jsx} jsx
 */
const AddRecipeForm = ({
  recipeName,
  recipeDetail,
  ingredients,
  directions,
  addRecipe,
  error,
  onChange,
  onImageChange
}) => (
  <div>
    <form id="add-recipe">
      {
        error && <div>{ error }  </div>
      }
      <div className="form-group">
        <label htmlFor="recipe-name">Recipe Name</label>
        <input
          type="text"
          className="form-control"
          name="recipeName"
          aria-describedby="recipeHelp"
          placeholder="Enter Recipe Name"
          value={recipeName}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="recipe-detail">Recipe Detail</label>
        <input
          type="text"
          className="form-control"
          name="recipeDetail"
          placeholder="Enter Recipe Detail"
          maxLength="250"
          value={recipeDetail}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          className="form-control"
          name="ingredients"
          rows="5"
          value={ingredients}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="directions">Directions</label>
        <textarea
          className="form-control"
          name="directions"
          rows="10"
          value={directions}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="recipe-image">Add Image</label>
        <input
          type="file"
          className="form-control-file"
          id="imageUrl"
          name="imageUrl"
          aria-describedby="fileHelp"
          onChange={onImageChange}
        />
        <small
          id="fileHelp"
          className="form-text text-muted"
        >Please attach an image file.
        </small>
      </div>
      <div className="edit-profile-button">
        <button
          id="click-add-recipe"
          className="btn btn-success"
          onClick={addRecipe}
        >Add Recipe
        </button>
      </div>
    </form>
  </div>
);

AddRecipeForm.defaultProps = {
  error: null
};

AddRecipeForm.propTypes = {
  recipeName: PropTypes.string.isRequired,
  recipeDetail: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  directions: PropTypes.string.isRequired,
  error: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
};

export default AddRecipeForm;
