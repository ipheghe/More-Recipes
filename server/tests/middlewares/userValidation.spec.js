import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];
const unauthToken = tokens[3];
const stringToken = tokens[4];

describe('<<< UserValidation Middleware: ', () => {
  describe('Signup Validation: ', () => {
    it('should return an error message for null username field', (done) => {
      server
        .post('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          username: '',
          password: 'abcde',
          fullName: 'Emeka Amadi',
          mobileNumber: 2348023451234,
          email: 'iphegheovie@yahoo.com',
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('username field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it(`should return an error message 
      for null password field`, (done) => {
        server
          .post('/api/v1/user/signup')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send({
            username: 'test1',
            password: '',
            fullName: 'Akpan Etim',
            mobileNumber: 2348032121234,
            email: 'liiov2004@yahoo.com',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('password field cannot be empty');
            if (err) return done(err);
            done();
          });
      });

    it('should return an error message for null fullName field', (done) => {
      server
        .post('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          username: 'test1',
          password: 'abcde',
          fullName: '',
          mobileNumber: 2348032121234,
          email: 'okonyahoo.com',
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('fullName field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it(`should return an error message
       for null mobile number field`, (done) => {
        server
          .post('/api/v1/user/signup')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send({
            username: 'test1',
            password: 'abcde',
            fullName: 'Emeka Nwabuzorr',
            mobileNumber: '',
            email: 'amadi@yahoo.com',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('mobile field cannot be empty');
            if (err) return done(err);
            done();
          });
      });

    it('should return an error message for null email field', (done) => {
      server
        .post('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          username: 'test1',
          password: 'bear',
          fullName: 'Vicky Emmanuel',
          mobileNumber: 2348032125434,
          email: '',
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('email field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for invalid username length', (done) => {
      server
        .post('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          username: 'te',
          password: 'bear',
          fullName: 'Mandy Bear',
          mobileNumber: 2348032125434,
          email: 'mandy@yahoo.com',
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should
            .equal('username must have more than 3 characters');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for invalid password length', (done) => {
      server
        .post('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          username: 'test1',
          password: 'ok',
          fullName: 'Mandy Bear',
          mobileNumber: 2348032125434,
          email: 'mandy@yahoo.com',
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should
            .equal('password must have more than 3 characters');
          if (err) return done(err);
          done();
        });
    });

    it(`should return an error message
       for invalid full name length`, (done) => {
        server
          .post('/api/v1/user/signup')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send({
            username: 'test1',
            password: 'abcde',
            fullName: 'Ma',
            mobileNumber: 2348032125434,
            email: 'mandy@yahoo.com',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should
              .equal('fullName must have more than 3 characters');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Signin Validation: ', () => {
    it('should return an error message for null username field', (done) => {
      server
        .post('/api/v1/user/signin')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          username: '',
          password: 'abcde',
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('username field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it(`should return an error message 
      for null password field`, (done) => {
        server
          .post('/api/v1/user/signin')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send({
            username: 'okon',
            password: '',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('password field cannot be empty');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('ChangePassword Validation: ', () => {
    it(`should return an error message 
      for null password field`, (done) => {
        server
          .put('/api/v1/user/changePassword')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({ password: null })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('password field cannot be empty');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('validUser Validation: ', () => {
    it(`should return an error message 
      for an invalid userId`, (done) => {
        server
          .put('/api/v1/user')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', stringToken)
          .type('form')
          .send({
            username: 'pnator',
            password: 'abcde',
            fullName: 'Emeka Amadi',
            mobileNumber: 2348023451234,
            email: 'iphegheovie@yahoo.com',
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('Id is Invalid!');
            if (err) return done(err);
            done();
          });
      });

    it(`should return an error message 
      for a non-existent userId `, (done) => {
        server
          .put('/api/v1/user')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', unauthToken)
          .type('form')
          .send({
            username: 'pnator',
            password: 'abcde',
            fullName: 'Emeka Amadi',
            mobileNumber: 2348023451234,
            email: 'iphegheovie@yahoo.com',
          })
          .end((err, res) => {
            res.status.should.equal(404);
            res.body.message.should.equal('user account not available!');
            if (err) return done(err);
            done();
          });
      });
  });
});
