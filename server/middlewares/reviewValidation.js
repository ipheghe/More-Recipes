const validateReview = (req, res, next) =>{
	//check if password field is empty
	if (!req.body.message || req.body.message.trim() === '') {
		return res.status(400).send({'message': 'review field cannot be empty', 'reviewData': req.body});
	}
	next();
};
export default validateReview