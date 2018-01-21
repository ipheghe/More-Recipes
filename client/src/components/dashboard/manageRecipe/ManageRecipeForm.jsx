import React from 'react';
import PropTypes from 'prop-types';

/**
 * ManageRecipeForm component
 *
 * @param {Object} props
 *
 * @return {jsx} jsx
 */
const ManageRecipeForm = ({
  recipeDetail,
  ingredients,
  directions,
  updateRecipe,
  deleteRecipe,
  loadRecipe,
  recipes,
  userRecipes,
  error,
  onChange,
  onImageChange,
}) => {
  let recipeId;
  return (
    <div>
      <form>
        {
          error && <div>{ error }  </div>
        }
        <div className="form-group">
          <label htmlFor="recipe-name-list">Select recipe</label>
          <select
            type="text"
            className="form-control click"
            name="recipeId"
            ref={(node) => { recipeId = node; }}
            onChange={() => {
              loadRecipe(recipeId.value);
            }}
          >
            <option value="">== Select Recipe ==</option>
            {
              (recipes && recipes.length > 0) ?
                userRecipes.map(userRecipe =>
                  (
                    <option
                      name="recipeId"
                      value={userRecipe.id}
                      key={userRecipe.id}
                    >{userRecipe.name}
                    </option>
                  ))
                : null
            }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="recipe-detail">Recipe Detail</label>
          <textarea
            className="form-control"
            name="recipeDetail"
            rows="2"
            placeholder="Enter Recipe Detail"
            maxLength="250"
            value={recipeDetail}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            className="form-control"
            name="ingredients"
            rows="5"
            placeholder="Enter recipe ingredients separated by a comma"
            value={ingredients}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="directions">Directions</label>
          <textarea
            className="form-control"
            id="directions"
            rows="10"
            placeholder="Enter recipe directions separated by a comma"
            value={directions}
            onChange={onChange}
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
            className="btn btn-success"
            onClick={updateRecipe}
          >Update Recipe
          </button>
          <button
            className="btn btn-danger"
            onClick={deleteRecipe}
          >Delete Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

ManageRecipeForm.defaultProps = {
  recipeDetail: '',
  ingredients: '',
  directions: '',
  error: null,
  recipes: [],
  userRecipes: []
};

ManageRecipeForm.propTypes = {
  recipeDetail: PropTypes.string,
  ingredients: PropTypes.string,
  directions: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.object),
  userRecipes: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  loadRecipe: PropTypes.func.isRequired
};

export default ManageRecipeForm;
