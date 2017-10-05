import models from '../server/models';
import jwt from 'jsonwebtoken';
import app from '../app';
import supertest from 'supertest';
import users from '../server/seeders/userSeeder';

process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const should = require('chai').should();
// This agent refers to PORT where program is runninng.
const server = supertest.agent(app);
const rootURL = '/api/v1';
const usersUrl = `${rootURL}/users`;
const signupUrl = `${rootURL}/users/signup`;
const signinUrl = `${rootURL}/users/signin`;
const testValidUsers = users.testValidUsers,
  validUsersLogin = users.validUsersLogin,
  invalidUsers = users.invalidUsers,
  incorrectPassword = users.incorrectPassword,
  nullForm = users.nullForm,
  userToken = [];
let testData;
const invalidToken = jwt.sign({ userID: 15, }, 'jsninja', { expiresIn: '3 days' });
const expiredToken = jwt.sign({ userID: 15, }, 'jsninja', { expiresIn: '2s' });

describe('Test Server Connection', () => {
  it('should respond with Status connected ok', (done) => {
    server
      .get('/api')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.body.message).to.equal('Status connected ok');
        expect(res.statusCode).to.equal(200);
        if (err) return done(err);
        done();
      });
  });
});
describe('Response Object', () => {
  it('should respond with a json object', (done) => {
    server
      .get('/api')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        if (err) return done(err);
        done();
      });
  });
});
describe('Catch invalid routes', () => {
    it('return a 404 if route not found', (done) => {
      server
        .get('/api/ydddfh')
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
describe('User signup',() => {
	it('should return message for successful account creation', (done) => {
	 testData = Object.assign({},testValidUsers[0]);
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
	  testData = Object.assign({},testValidUsers[0]);
	  testData.username = '';
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.userData.firstName.should.eql('Emeka');
	      res.body.message.should.equal('username field cannot be empty');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for null password field', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  delete testData.password;
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.message.should.equal('password field cannot be empty');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for null firstName field', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  testData.firstName = '';
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.message.should.equal('firstName field cannot be empty');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for null lastName field', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  delete testData.lastName;
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.message.should.equal('lastName field cannot be empty');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for null mobile field', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  delete testData.mobileNumber;
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.message.should.equal('mobile field cannot be empty');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for null email field', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  testData.email = '';
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.message.should.equal('email field cannot be empty');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for invalid username length', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  testData.username = 'as';
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.message.should.equal('username must have more than 3 characters');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for invalid password length', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  testData.password = 'as';
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.message.should.equal('password must have more than 3 characters');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for invalid first name length', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  testData.firstName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+
	  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
	  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.message.should.equal('firstName must have less than 51 characters');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for invalid last name length', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  testData.lastName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+
	  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
	  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.message.should.equal('lastName must have less than 51 characters');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return 400 status error for adding spaces inbetween username', (done) => {
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testValidUsers[3])
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.error.should.equal('Validation error: Username must start with a letter and have no spaces.');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a 400 status for entering an existing username', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
      testData.email = 'jack@yahoo.com';
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.error.should.equal('Username already exists');
	      if (err) return done(err);
	      done();
	    });
	});
	it('should return a message for last name field containing numbers', (done) => {
	  testData = Object.assign({},testValidUsers[0]);
	  testData.lastName = '112'+12;
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testData)
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.error[0].should.equal('V');
	      if (err) return done(err);
	      done();
		});
	});
	it('should return a 400 status for entering an invalid email', (done) => {
	    server
	    .post(signupUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(testValidUsers[2])
	    .end((err,res) => {
	      res.status.should.equal(400);
	      res.body.error.should.equal('Validation error: Invalid Email');
	      if (err) return done(err);
	      done();
	    });
	});
});
describe('User signin',() => {
	it('should return a message for an invalid username', (done) => {
	    server
	    .post(signinUrl)
	    .set('Connection', 'keep alive')
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .type('form')
	    .send(invalidUsers[0])
	    .end((err,res) => {
	      res.status.should.equal(404);
	      res.body.message.should.equal('Authentication failed. Username is incorrect or does not exist');
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
	    .end((err,res) => {
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
	    .end((err,res) => {
	      res.status.should.equal(404);
	      res.body.message.should.equal('Authentication failed. Incorrect password');
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
	   	.end((err,res) => {
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
	    .end((err,res) => {
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
    it('return a 404 if user not found', (done) => {
      server
        .get(`${usersUrl}/bimbo`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({username: 'ashanti'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('User doesnt exist');
          if (err) return done(err);
          done();
        });
    });
    it('return a 200 if user exists', (done) => {
      server
        .get(`${usersUrl}/okon`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({username: 'okon'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('User Exists!');
          if (err) return done(err);
          done();
        });
    });
});
