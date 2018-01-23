import supertest from 'supertest';
import app from '../../../app';
import { invalidToken } from '../seeders/seeds';

require('chai').should();

const server = supertest.agent(app);

describe('<<< RequireAuth Middleware: ', () => {
  describe('Authenticate Routes: ', () => {
    it(`should deny route access to unauthenticated
        users if no token is provided`, (done) => {
        server
          .post('/api/v1/recipe')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send({
            name: 'Banga soup',
            description: 'popular recipe',
            ingredients: 'palm kernel, assorted meat',
            directions: '',
            imageUrl: 'dist/image3'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('No token provided!');
            if (err) return done(err);
            done();
          });
      });

    it(`should deny route access to unauthenticated
        users with invalid token`, (done) => {
        server
          .post('/api/v1/recipe')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', invalidToken)
          .type('form')
          .send({
            name: 'Banga soup',
            description: 'popular recipe',
            ingredients: 'palm kernel, assorted meat',
            directions: '',
            imageUrl: 'dist/image3'
          })
          .end((err, res) => {
            res.status.should.equal(401);
            res.body.message.should.equal('Invalid Token');
            if (err) return done(err);
            done();
          });
      });
  });
});
