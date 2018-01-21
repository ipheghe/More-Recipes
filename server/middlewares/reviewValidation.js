/**
 * @module validateReview
 * @description middleware function to validate favorite field
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const reviewValidation = (req, res, next) => {
  // check if password field is empty
  if (!req.body.message || req.body.message.trim() === '') {
    return res.status(400).send({
      message: 'review message field cannot be empty',
      reviewData: req.body
    });
  }
  next();
};

export default reviewValidation;
