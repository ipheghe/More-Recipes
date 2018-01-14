import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mockLocalStorage from './mockLocalStorage';

dotenv.load();

const userData = {
  id: 1,
  username: 'linda'
};
// User is found and password is correct
// create a token for authentication
const token = jwt.sign({
  user: userData
}, process.env.TOKEN_SECRET, {
  expiresIn: process.env.TOKEN_EXPIRY_TIME // expires in 6 hours
});

window.localStorage = mockLocalStorage;

const mockAuthCheck = jest.fn(() => {
  mockLocalStorage.setItem('token', token);
  return true;
});

export default mockAuthCheck;
