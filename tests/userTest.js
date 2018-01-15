import supertest from 'supertest';
import app from '../app';
import users from '../server/seeders/userSeeder';

process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const should = require('chai').should();
// This agent refers to PORT where program is runninng.
const server = supertest.agent(app);
const rootURL = '/api/v1';
const usersUrl = `${rootURL}/user`;
const signupUrl = `${rootURL}/user/signup`;
const signinUrl = `${rootURL}/user/signin`;
const [
  validUsersLogin,
  testValidUsers,
  invalidUsers,
  incorrectPassword,
  nullForm] =
  [
    users.validUsersLogin,
    users.testValidUsers,
    users.invalidUsers,
    users.incorrectPassword,
    users.nullForm
  ];
const userToken = [];
let testData;


describe('Test Server Connection', () => {
  it('should respond with Status connected ok', (done) => {
    server
      .get('/api')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        if (err) return done(err);
        done();
      });
  });
});
describe('Catch invalid routes', () => {
  it('should return a 404 if route not found', (done) => {
    server
      .get('/****kkkkmn/jjdjjd')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Oops! 404. Page not Found');
        if (err) return done(err);
        done();
      });
  });
});
describe('User signup', () => {
  it('should return message for successful account creation', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(201);
        expect(res.body.message).to.equal('User account successfully created.');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for null username field', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    testData.username = '';
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('username field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for null password field', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    delete testData.password;
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('password field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for null fullName field', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    testData.fullName = '';
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('fullName field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for null mobile field', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    delete testData.mobileNumber;
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('mobile field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for null email field', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    testData.email = '';
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('email field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for invalid username length', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    testData.username = 'as';
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('username must have more than 3 characters');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for invalid password length', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    testData.password = 'as';
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('password must have more than 3 characters');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for invalid full name length', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    testData.fullName = 'a'.repeat(64);
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('fullName must have less than 51 characters');
        if (err) return done(err);
        done();
      });
  });
  it('should return 401 status error for adding spaces inbetween username', (done) => {
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[3])
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.error.should.equal('Validation error: Username must start with a letter and have no spaces.');
        if (err) return done(err);
        done();
      });
  });
  it('should return 401 status for entering an existing username', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    testData.email = 'jack@yahoo.com';
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.error.should.equal('Username already exists');
        if (err) return done(err);
        done();
      });
  });
  it('should return a 401 status for entering an invalid email', (done) => {
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[2])
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.error.should.equal('Validation error: Invalid Email');
        if (err) return done(err);
        done();
      });
  });
});
describe('User signin', () => {
  it('should return a message for an invalid username', (done) => {
    server
      .post(signinUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidUsers[0])
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Authentication failed.' +
          ' Username is incorrect or does not exist');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for null username field', (done) => {
    server
      .post(signinUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidUsers[1])
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('username field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for an invalid password', (done) => {
    server
      .post(signinUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(incorrectPassword[0])
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Authentication failed!');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for null password field', (done) => {
    server
      .post(signinUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(incorrectPassword[1])
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('password field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status for successfully login', (done) => {
    server
      .post(signinUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validUsersLogin[0])
      .end((err, res) => {
        res.status.should.equal(200);
        userToken[0] = res.body.authToken;
        res.body.message.should.equal('Authentication & Login successful');
        if (err) return done(err);
        done();
      });
  });
  it('should return error', (done) => {
    server
      .post(signinUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(nullForm[0])
      .end((err, res) => {
        res.status.should.equal(400);
        if (err) return done(err);
        done();
      });
  });
});
describe('Check If User Exists', () => {
  it('should return a 404 status code if user not found', (done) => {
    server
      .get(`${usersUrl}/bimbo`)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .send({
        username: 'ashanti'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('User doesnt exist');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status after fetching user record successfully', (done) => {
    server
      .get(`${usersUrl}/okon`)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .send({
        username: 'okon'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('User Record retrieved successfully');
        if (err) return done(err);
        done();
      });
  });
});
describe('Update User Records', () => {
  it('should return 200 status for successfully updating user record', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    testData.fullName = 'Chima Ejiofor';
    server
      .put('/api/v1/user')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken[0])
      .send(testData)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('User Record Updated SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('return a 401 if user is unauthorized', (done) => {
    testData = Object.assign({}, testValidUsers[0]);
    testData.fullName = 'Ch';
    server
      .put('/api/v1/user')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken[0])
      .send(testData)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        if (err) return done(err);
        done();
      });
  });
});
describe('Change User Password', () => {
  it('should return 200 status for successful changing user password', (done) => {
    const passwordData = {
      password: 'abcdeddddddd',
      newPassword: 'abcdef'
    };
    server
      .put('/api/v1/user/changePassword')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken[0])
      .send(passwordData)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.message).to.equal('Incorrect password');
        if (err) return done(err);
        done();
      });
  });
  it('return a 401 if user is unauthorized', (done) => {
    const passwordData = {
      password: 'abcde',
      newPassword: 'abcdef'
    };
    server
      .put('/api/v1/user/changePassword')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken[0])
      .send(passwordData)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('User Password Changed SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
});
