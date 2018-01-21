import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];

describe('<<< Favorites Controller: ', () => {
  describe('UnFavorite Recipe: ', () => {
    it(`should return a success message for
        unfavoriting a recipe successfully`, (done) => {
        server
          .delete('/api/v1/favorite/101')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('Recipe Unfavorited SuccessFullly!');
            if (err) return done(err);
            done();
          });
      });

    it(`should return a success message for
        favoriting a recipe successfully`, (done) => {
        server
          .post('/api/v1/recipe/104/1/favorite')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({ id: 103 })
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should
              .equal('Recipe added to favorites Successfully');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Get User Favorites: ', () => {
    it('retrieves all user favorite recipes successfully', (done) => {
      server
        .post('/api/v1/favorites')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should
            .equal('User Favorite recipes retrieved Successfully');
          res.body.userFavorites.rows.should.be.an('array');
          res.body.userFavorites.rows.length.should.equal(1);
          if (err) return done(err);
          done();
        });
    });

    it(`displays a warning message if
       user has no favorite recipe yet`, (done) => {
        const token = tokens[1];
        server
          .post('/api/v1/favorites')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', token)
          .type('form')
          .end((err, res) => {
            res.body.message.should
              .equal('There are no favourite recipe for this user');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Get a User Favorite Recipe: ', () => {
    it('should retrieve user favorite recipe successfully', (done) => {
      server
        .get('/api/v1/favorite/104')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should
            .equal('User Favorite recipe retrieved Successfully');
          res.body.userFavorite[0].should.be.an('object');
          if (err) return done(err);
          done();
        });
    });

    it(`displays a warning message if user tries to retrieve
       a favorite recipe that doesnt exist`, (done) => {
        const token = tokens[1];
        server
          .get('/api/v1/favorite/7')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', token)
          .type('form')
          .end((err, res) => {
            res.body.message.should
              .equal('User has not favorited this recipe');
            if (err) return done(err);
            done();
          });
      });
  });
});
