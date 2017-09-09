export let validateUser = (req,res) => {
      //check if username field is empty
      if (!req.body.username || req.body.username.trim() === '' ) {
          return res.status(400).send({'error': false, 'message': 'username field cannot be empty', 'userData': req.body});
      }
     //check if password field is empty
     if (!req.body.password || req.body.password.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'password field cannot be empty', 'userData': req.body});
      }
    //check if firstName field is empty
      if (!req.body.firstName || req.body.firstName.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'firstName field cannot be empty', 'userData': req.body});
      }
    //check if lastName field is empty
      if (!req.body.lastName || req.body.lastName.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'lastName field cannot be empty', 'userData': req.body});
      }
   //check if mobile field is empty
      if (!req.body.mobileNumber || req.body.mobileNumber === '') {
          return res.status(400).send({'error': false, 'message': 'mobile field cannot be empty', 'userData': req.body});
      }
   //check if email field is empty
      if (!req.body.email || req.body.email.trim() === '') {
          return res.status(400).send({'error': false, 'message': 'email field cannot be empty', 'userDate': req.body});
      }

    //check if password field contains more than 3 characters
      if (req.body.password.trim() < 4) {
          return res.status(400).send({'error': false, 'message': 'password must have more than 3 characters', 'userData': req.body});
      }
    //check if firstName field contains more than 3 characters
     if (req.body.firstName.length > 50) {
          return res.status(400).send({'error': false, 'message': 'firstName must have less than 51 characters', 'userData': req.body});
      }
    //check if lastName field contains more than 3 characters
     if (req.body.lastName.length > 50) {
          return res.status(400).send({'error': false, 'message': 'lastName must have less than 51 characters', 'userData': req.body});
      }
}