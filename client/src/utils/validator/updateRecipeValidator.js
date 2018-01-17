/**
 * updateRecipeValidator
 *
 * @returns {object} status message
 */

const updateRecipeValidator = (
  ingredients,
  directions,
  recipeId,
  recipeIdValue
) => {
  const error = { errorStatus: false, message: '' };

  if (ingredients === '') {
    error.status = true;
    error.message = 'ingredients field cannot be empty';
    return error;
  }

  if (directions === '') {
    error.status = true;
    error.message = 'directions field cannot be empty';
    return error;
  }

  if (
    !recipeId
    || recipeId === ''
    || !recipeIdValue
  ) {
    error.message = 'Please select a recipe';
    return error;
  }
  return error;
};

export default updateRecipeValidator;

