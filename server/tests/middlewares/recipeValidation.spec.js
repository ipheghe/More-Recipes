import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];

describe('<<< RecipeValidation Middleware: ', () => {
  describe('Add Recipe Validation: ', () => {
    it('responds with status 400 if name field is null', (done) => {
      server
        .post('/api/v1/recipe')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          description: 'popular recipe',
          ingredients: 'palm kernel, assorted meat',
          directions: 'pour palm oil in pot, blanch oil for 10mins',
          imageUrl: 'dist/image3'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('name field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('responds with status 400 if ingredients field is empty', (done) => {
      server
        .post('/api/v1/recipe')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Banga soup',
          description: 'popular recipe',
          ingredients: '',
          directions: 'pour palm oil in pot, blanch oil for 10mins',
          imageUrl: 'dist/image3'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('ingredients field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('responds with status 400 if directions field is empty', (done) => {
      server
        .post('/api/v1/recipe')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
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
          res.body.message.should.equal('directions field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('responds with status 400 if image url field is empty', (done) => {
      server
        .post('/api/v1/recipe')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', authToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Banga soup',
          description: 'popular recipe',
          ingredients: 'palm kernel, assorted meat',
          directions: 'pour palm oil in pot, blanch oil for 10mins',
          imageUrl: ''
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('imageUrl field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it(`responds with status 400 if views
       field has a negative number`, (done) => {
        server
          .post('/api/v1/recipe')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authToken)
          .set('Content-Type', 'application/json')
          .type('form')
          .send({
            name: 'Banga soup',
            description: 'popular recipe',
            ingredients: 'palm kernel, assorted meat',
            directions: 'pour palm oil in pot, blanch oil for 10mins',
            imageUrl: 'dist/image3',
            views: -500,
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should.equal('views cannot be a negative number');
            if (err) return done(err);
            done();
          });
      });

    it(`responds with status 400 if upvotes
      field has a negative number`, (done) => {
        server
          .post('/api/v1/recipe')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authToken)
          .set('Content-Type', 'application/json')
          .type('form')
          .send({
            name: 'Banga soup',
            description: 'popular recipe',
            ingredients: 'palm kernel, assorted meat',
            directions: 'pour palm oil in pot, blanch oil for 10mins',
            imageUrl: 'dist/image3',
            upvotes: -500,
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should
              .equal('upvotes cannot be a negative number');
            if (err) return done(err);
            done();
          });
      });

    it(`responds with status 400 if downvotes
       field has a negative number`, (done) => {
        server
          .post('/api/v1/recipe')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', authToken)
          .set('Content-Type', 'application/json')
          .type('form')
          .send({
            name: 'Banga soup',
            description: 'popular recipe',
            ingredients: 'palm kernel, assorted meat',
            directions: 'pour palm oil in pot, blanch oil for 10mins',
            imageUrl: 'dist/image3',
            downvotes: -500,
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.message.should
              .equal('downvotes cannot be a negative number');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('recipeExisits Validation: ', () => {
    it(`should return an error message 
      for an invalid recipeId`, (done) => {
        server
          .put('/api/v1/recipe/string')
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
          .put('/api/v1/recipe/500')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(404);
            res.body.message.should.equal('Recipe Not Found!');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('userRecipeExisits Validation: ', () => {
    it(`should return an error message 
      for an invalid recipeId`, (done) => {
        server
          .delete('/api/v1/recipe/string')
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
       trying to delete another user's recipe `, (done) => {
        server
          .delete('/api/v1/recipe/102')
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
