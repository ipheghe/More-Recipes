/**
 * AddRecipeValidator
 *
 * @returns {object} status message
 */

const AddRecipeValidator = (
  recipeName,
  ingredients,
  directions,
  imageUrl
) => {
  const error = { errorStatus: false, message: '' };

  if (recipeName === '') {
    error.status = true;
    error.message = 'Recipe name field cannot be empty';
    return error;
  }

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

  if (imageUrl === '') {
    error.status = true;
    error.message = 'Recipe image field cannot be empty';
    return error;
  }

  return error;
};

export default AddRecipeValidator;

