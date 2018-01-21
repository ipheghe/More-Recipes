import supertest from 'supertest';
import app from '../../app';
import { tokens } from './seeders/seeds';
import db from '../models';

require('chai').should();

const server = supertest.agent(app);
const { User } = db;
const authToken = tokens[0];
const err = 'Internal Server Error';

describe('Catch Block Errors', () => {
  describe('POST /api/v1/user/signup route', () => {
    it('responds with status 500 for server failure', (done) => {
      User.findOne = () => Promise.reject(err);
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
          res.status.should.equal(500);
          res.body.error.should
            .equal('Internal Server Error');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /api/v1/user/signin route', () => {
    it('responds with status 500 for server failure', (done) => {
      User.findOne = () => Promise.reject(err);
      server
        .post('/api/v1/user/signin')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({
          username: 'okon',
          password: 'abcde',
        })
        .end((err, res) => {
          res.status.should.equal(500);
          res.body.error.should
            .equal('Internal Server Error');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET /api/v1/user/:username route', () => {
    it('responds with status 500 for server failure', (done) => {
      User.findOne = () => Promise.reject(err);
      server
        .get('/api/v1/user/okon')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(500);
          res.body.error.should
            .equal('Internal Server Error');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /api/v1/user/forgotPassword route', () => {
    it('responds with status 500 for server failure', (done) => {
      User.findOne = () => Promise.reject(err);
      server
        .post('/api/v1/user/forgotPassword')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(500);
          res.body.error.should
            .equal('Internal Server Error');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /api/v1/user/reset-password/:token route', () => {
    it('responds with status 500 for server failure', (done) => {
      User.findOne = () => Promise.reject(err);
      server
        .post('/api/v1/user/reset-password/hhjbjkbjbjkbjkbnjb3khbhb33')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(500);
          res.body.error.should
            .equal('Internal Server Error');
          if (err) return done(err);
          done();
        });
    });
  });
});
