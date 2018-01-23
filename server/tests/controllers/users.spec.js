import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';
import mailTransporter from '../../helpers/mailTransporter';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];

describe('<<< Users Controller: ', () => {
  describe('Signup User: ', () => {
    it('should return message for successful account creation', (done) => {
      server
        .post('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({
          username: 'testuser3',
          password: 'abcde',
          fullName: 'User Test',
          mobileNumber: 2348023451212,
          email: 'usertest@yahoo.com',
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.message.should.equal('User account successfully created.');
          if (err) return done(err);
          done();
        });
    });

    it('should not create user with same username twice', (done) => {
      server
        .post('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({
          username: 'testuser3',
          password: 'abcde',
          fullName: 'User Test',
          mobileNumber: 2348023451212,
          email: 'usertes1t@yahoo.com',
        })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Username you entered already exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not create user with same email twice', (done) => {
      server
        .post('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({
          username: 'user2',
          password: 'abcde',
          fullName: 'User Test',
          mobileNumber: 2348023451212,
          email: 'usertest@yahoo.com',
        })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should
            .equal('Email address you entered already exist');
          if (err) return done(err);
          done();
        });
    });

    it(`displays an error message if spaces
        are found inbetween username`, (done) => {
        server
          .post('/api/v1/user/signup')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({
            username: 'u s e r 2',
            password: 'abcde',
            fullName: 'User Test',
            mobileNumber: 2348023451212,
            email: 'usertest3@yahoo.com',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should
              .equal('Validation error: Username must start ' +
              'with a letter and have no spaces.');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Signin User: ', () => {
    it('should return message for succesfully user login', (done) => {
      server
        .post('/api/v1/user/signin')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          username: 'testuser3',
          password: 'abcde'
        })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should.equal('Authentication & Login successful');
          if (err) return done(err);
          done();
        });
    });

    it('should not sign user with unregistered username', (done) => {
      server
        .post('/api/v1/user/signin')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({
          username: 'unregistered',
          password: 'abcde'
        })
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.message.should.equal('Authentication failed. ' +
          'Username is incorrect or does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not sign user in with incorrect password', (done) => {
      server
        .post('/api/v1/user/signin')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({
          username: 'testuser3',
          password: 'incorrect'
        })
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.message.should.equal('Authentication failed!');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get UserDetails: ', () => {
    it('should return current user details', (done) => {
      server
        .get('/api/v1/user/testuser3')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should.equal('User Record retrieved successfully');
          res.body.userData.username.should.equal('testuser3');
          res.body.userData.fullName.should.equal('User Test');
          if (err) return done(err);
          done();
        });
    });

    it('responds with status 400 if user doesn not exist', (done) => {
      server
        .get('/api/v1/user/nonuser')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.message.should.equal('User doesnt exist');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Update User: ', () => {
    it(`displays success message after
       updating user record successfully`, (done) => {
        server
          .put('/api/v1/user')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({
            fullName: 'User Test2',
            mobileNumber: 23471283933,
          })
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should.equal('User Record Updated SuccessFullly!');
            res.body.userData.fullName.should.equal('User Test2');
            res.body.userData.mobileNumber.should.equal('23471283933');
            if (err) return done(err);
            done();
          });
      });

    it('should not create user with same username twice', (done) => {
      server
        .put('/api/v1/user')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({ username: 'testuser' })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Username you entered already exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not create user with same email twice', (done) => {
      server
        .put('/api/v1/user')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({ email: 'usertest@yahoo.com' })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should
            .equal('Email address you entered already exist');
          if (err) return done(err);
          done();
        });
    });

    it(`displays an error message if spaces
        are found inbetween username`, (done) => {
        server
          .put('/api/v1/user')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({
            username: 'u s e r 2',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should
              .equal('Validation error: Username must start ' +
              'with a letter and have no spaces.');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Change Password: ', () => {
    it(`displays success message after
       changing password successfully`, (done) => {
        server
          .put('/api/v1/user/changePassword')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({
            password: 'abcde',
            newPassword: 'abcdef',
          })
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('User Password Changed SuccessFullly!');
            res.body.status.should.equal('Success');
            if (err) return done(err);
            done();
          });
      });

    it(`displays error message if
      password is incorrect`, (done) => {
        server
          .put('/api/v1/user/changePassword')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({
            password: 'abcdegvhg',
            newPassword: 'abcdef',
          })
          .end((err, res) => {
            res.status.should.equal(401);
            res.body.message.should
              .equal('Incorrect password');
            res.body.status.should.equal('Fail');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Forgot Password: ', () => {
    it(`displays success message after
       changing password successfully`, (done) => {
        mailTransporter.sendMail = () => Promise.resolve(1);
        server
          .post('/api/v1/user/forgotPassword')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({ email: 'iphegheovie@yahoo.com' })
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('Please check your email for ' +
              'the link to reset your password.');
            res.body.status.should.equal('Success');
            if (err) return done(err);
            done();
          });
      });

    it(`responds with status 500 if recovery email
      is not sent successfully`, (done) => {
        const err = 'Error sending recovery mail. Please try again later';
        mailTransporter.sendMail = () => Promise.reject(err);
        server
          .post('/api/v1/user/forgotPassword')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({ email: 'iphegheovie@yahoo.com' })
          .end((err, res) => {
            res.status.should.equal(500);
            res.body.error.should
              .equal('Error sending recovery mail. Please try again later');
            res.body.status.should.equal('Fail');
            if (err) return done(err);
            done();
          });
      });

    it(`displays error message if
      email doesnt exist`, (done) => {
        server
          .post('/api/v1/user/forgotPassword')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({ email: 'iwrongemail@yahoo.com' })
          .end((err, res) => {
            res.status.should.equal(404);
            res.body.message.should
              .equal('user email does not exist!');
            res.body.status.should.equal('Fail');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Verify Token Password: ', () => {
    it(`displays success message after
      reseting password successfully`, (done) => {
        const token = tokens[1];
        mailTransporter.sendMail = () => Promise.resolve(1);
        server
          .post('/api/v1/user/reset-password/87a3ffadc0ed4379657e4050a254fc' +
         '486475c783b69916de087135d68070fe0b894a8a735d523054b28b86763f33293f7')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', token)
          .send({ password: 'abcde' })
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('Please check your email for ' +
              'the link to reset your password.');
            res.body.status.should.equal('Success');
            if (err) return done(err);
            done();
          });
      });

    it(`displays error message if
      reset password token has expired`, (done) => {
        server
          .post('/api/v1/user/reset-password/7a3ffadc0ed4379657e4050a254fc' +
         '486475c783b69916de087135d68070fe0b894a8a735d523054b28b86763f33293f7')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .send({ password: 'abcde' })
          .type('form')
          .end((err, res) => {
            res.status.should.equal(422);
            res.body.error.should
              .equal('Your token has expired. ' +
             'Please attempt to reset your password again.');
            if (err) return done(err);
            done();
          });
      });
  });
});
