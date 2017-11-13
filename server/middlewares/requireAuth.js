import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();

const authorize = {
  verifyUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization || req.params.token;
    if (!token) {
      return res.status(403).send({
        message: 'No token provided!'
      });
    } else if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send(err);
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(403).send({ message: 'Authentication Unsuccessful!! Token not provided' });
    }
  }
};

export default authorize;
