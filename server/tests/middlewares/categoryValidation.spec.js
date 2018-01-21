import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];

describe('<<< CategoryValidation Middleware: ', () => {
  describe('Create Category Validation: ', () => {
    it('should return an error message for an empty name field', (done) => {
      server
        .post('/api/v1/user/category')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ name: '' })
        .set('x-access-token', authToken)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('category name field cannot be empty');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('categoryExists Validation: ', () => {
    it(`should return an error message 
      for an invalid categoryId`, (done) => {
        server
          .get('/api/v1/category/user/string')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('Invalid Id!');
            if (err) return done(err);
            done();
          });
      });

    it(`should return an error message 
      for a non-existent recipe `, (done) => {
        server
          .get('/api/v1/category/user/500')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(404);
            res.body.message.should.equal('Category Not Found!');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('userCategoryExisits Validation: ', () => {
    it(`should return an error message 
      for an invalid categoryId`, (done) => {
        server
          .delete('/api/v1/user/category/string')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('Invalid Id!');
            if (err) return done(err);
            done();
          });
      });

    it(`should return an error message for user
       trying to delete another user's category `, (done) => {
        server
          .delete('/api/v1/user/category/102')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(401);
            res.body.message.should.equal('Access Denied!');
            if (err) return done(err);
            done();
          });
      });
  });
});
