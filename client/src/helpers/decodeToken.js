const jwt = require('jsonwebtoken');

/**
 * @description decodes the token and returns the user id or invalid token msg
 * @param {string} encodedToken
 * @return {string} decoded user Id
 * if successful or invalid token if unsuccessful
 */
const decodeToken = (encodedToken) => {
  const decodedToken = jwt.decode(encodedToken);
  if (decodedToken) {
    return decodedToken;
  }
  return 'Invalid Token';
};

export default decodeToken;
