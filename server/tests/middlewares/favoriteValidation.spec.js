import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];

describe('<<< FavoriteValidation Middleware: ', () => {
  describe('FavoriteExists Validation: ', () => {
    it(`should return a success message
      for favoriting a recipe`, (done) => {
        server
          .post('/api/v1/recipe/101/101/favorite')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should
              .equal('Recipe added to favorites Successfully');
            if (err) return done(err);
            done();
          });
      });

    it(`should return a message 
      for if user has already favorited recipe `, (done) => {
        server
          .post('/api/v1/recipe/101/101/favorite')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.body.message.should.equal('Recipe already favorited by user!');
            if (err) return done(err);
            done();
          });
      });
  });
});
