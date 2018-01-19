/**
 * editProfileFieldValidator
 *
 * @returns {object} status message
 */

const editProfileValidator = (
  username,
  fullName,
  mobileNumber,
  email
) => {
  const error = { errorStatus: false, message: '' };
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const numericExpression = /^[0-9]+$/;
  const regExpression = /^[A-Za-z][A-Za-z0-9-]+$/i;

  if (!username.match(regExpression)) {
    error.status = true;
    error.message = 'Username must start with a letter and have no spaces.';
    return error;
  }

  if (fullName.length < 4) {
    error.status = true;
    error.message = 'fullname must contain more than 3 chareacters';
    return error;
  }

  if (!mobileNumber.match(numericExpression)) {
    error.status = true;
    error.message = 'mobile number must contain only numbers';
    return error;
  }

  if (reg.test(email) === false) {
    error.status = true;
    error.message = 'Invalid Email Address';
    return error;
  }

  return error;
};

export default editProfileValidator;
