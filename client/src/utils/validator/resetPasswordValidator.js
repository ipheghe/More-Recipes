/**
 * resetPasswordValidator
 *
 * @returns {object} status message
 */

const resetPasswordValidator = (
  newPassword,
  confirmPassword,
) => {
  const error = { errorStatus: false, message: '' };

  if (newPassword === '') {
    error.status = true;
    error.message = 'new password field cannot be empty';
    return error;
  }

  if (confirmPassword === '') {
    error.status = true;
    error.message = 'confirm password field cannot be empty';
    return error;
  }

  if (newPassword !== confirmPassword) {
    error.status = true;
    error.message = 'Password mismatch!';
    return error;
  }

  return error;
};

export default resetPasswordValidator;
