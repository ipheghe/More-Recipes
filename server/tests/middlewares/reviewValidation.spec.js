import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];

describe('<<< ReviewValidation Middleware: ', () => {
  describe('Post Review Validation: ', () => {
    it('should return an error message for an empty message field', (done) => {
      server
        .post('/api/v1/recipe/101/review')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ message: '' })
        .set('x-access-token', authToken)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('review message field cannot be empty');
          if (err) return done(err);
          done();
        });
    });
  });
});
