import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];

describe('<<< Recipes Controller: ', () => {
  describe('Add Recipe: ', () => {
    it(`should return a success message for
        adding a recipe successfully`, (done) => {
        server
          .post('/api/v1/recipe')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({
            name: 'Coconut Rice',
            description: 'This recipe is very popular and enjoyed by all',
            ingredients: 'rice, onions, fresh tomatoes, chicken',
            directions: 'parboil rice for 15mins, boil chicken',
            imageUrl: 'dist/image2'
          })
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should.equal('Recipe Added SuccessFullly!');
            if (err) return done(err);
            done();
          });
      });

    it('should not create user with same recipe name twice', (done) => {
      server
        .post('/api/v1/recipe')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({
          name: 'Coconut Rice',
          description: 'This recipe is very popular and enjoyed by all',
          ingredients: 'rice, onions, fresh tomatoes, chicken',
          directions: 'parboil rice for 15mins, boil chicken',
          imageUrl: 'dist/image2'
        })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Recipe name exists!');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Update Recipe: ', () => {
    it(`displays success message after
       updating recipe successfully`, (done) => {
        server
          .put('/api/v1/recipe/101')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({
            description: 'This food is special',
            imageUrl: 'assets/images/coconut_rice.jpg'
          })
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should.equal('Recipe Updated SuccessFullly!');
            res.body.recipe.description.should.equal('This food is special');
            res.body.recipe.imageUrl.should
              .equal('assets/images/coconut_rice.jpg');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Delete Recipe: ', () => {
    it(`displays success message after
       deleting recipe successfully`, (done) => {
        server
          .delete('/api/v1/recipe/103')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should.equal('Recipe Deleted SuccessFullly!');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Get User Recipes: ', () => {
    it('retrieves all user recipes successfully', (done) => {
      server
        .post('/api/v1/recipes/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should
            .equal('All User Recipes Retrieved SuccessFullly!');
          res.body.recipes.rows.should.be.an('array');
          if (err) return done(err);
          done();
        });
    });

    it('displays a message if user has no recipe yet', (done) => {
      const token = tokens[5];
      server
        .post('/api/v1/recipes/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', token)
        .type('form')
        .end((err, res) => {
          res.body.message.should
            .equal('No recipe found for user');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get Recipe: ', () => {
    it(`should retrieve recipe successfully without incrementing
    the views of the recipe`, (done) => {
        server
          .get('/api/v1/recipe/101')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('Recipe Retrieved SuccessFullly!');
            res.body.recipe.should.be.an('object');
            res.body.recipe.views.should.equal(0);
            if (err) return done(err);
            done();
          });
      });

    it(`should retrieve recipe successfully and increment
       the views of the recipe from 0 to 1`, (done) => {
        server
          .get('/api/v1/view-recipe/101')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('Recipe Retrieved SuccessFullly!');
            res.body.recipe.should.be.an('object');
            res.body.recipe.views.should.equal(1);
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Get All Recipes: ', () => {
    it(`displays a success message after
       retrieving all recipes successfully`, (done) => {
        server
          .post('/api/v1/recipes')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('All Recipes Retrieved SuccessFullly!');
            res.body.recipes.should.be.an('array');
            res.body.recipes.length.should.equal(6);
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Get Top Recipes: ', () => {
    it(`retrieves all top recipes sorting them by their
       upvotes number in descending order`, (done) => {
        server
          .post('/api/v1/recipes?sort=upvotes&order=descending')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('All Top Recipes Retrieved SuccessFullly!');
            res.body.recipes.count.should.equal(6);
            res.body.recipes.rows.should.be.an('array');
            res.body.recipes.rows[0].name.should.equal('Jollof Rice');
            res.body.recipes.rows[0].upvotes.should.equal(3);
            res.body.recipes.rows[1].name.should.equal('Banga Soup');
            res.body.recipes.rows[1].upvotes.should.equal(2);
            res.body.recipes.rows[2].name.should.equal('Fried Rice');
            res.body.recipes.rows[2].upvotes.should.equal(1);
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Search Recipes By Ingredients: ', () => {
    it('retrieves all searched recipes by ingredients', (done) => {
      server
        .post('/api/v1/recipes?ingredients= maggi, rice')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should
            .equal('Recipes Retrieved SuccessFullly!');
          res.body.recipes.count.should.equal(5);
          res.body.recipes.rows.should.be.an('array');
          res.body.recipes.rows[0].ingredients.should
            .equal('rice, onions, fresh tomatoes,' +
            ' assorted meat, maggi, turkey');
          res.body.recipes.rows[4].ingredients.should
            .equal('palm kernel, assorted meat, maggi, palm oil');
          if (err) return done(err);
          done();
        });
    });

    it(`displays search result message if
       no ingredients matches keyword`, (done) => {
        server
          .post('/api/v1/recipes?ingredients=yeast')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('No recipe matches your search');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Search Recipes: ', () => {
    it('retrieves all searched recipes', (done) => {
      server
        .post('/api/v1/recipes?search=onions')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should
            .equal('Search result retrieved successfully!');
          res.body.recipes.count.should.equal(3);
          res.body.recipes.rows.should.be.an('array');
          res.body.recipes.rows[0].ingredients.should
            .equal('rice, onions, fresh tomatoes,' +
            ' assorted meat, maggi, turkey');
          if (err) return done(err);
          done();
        });
    });

    it(`displays search result message if
       no recipe matches keyword`, (done) => {
        server
          .post('/api/v1/recipes?search=yeast')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should
              .equal('Sorry!!! No recipe matches your search');
            if (err) return done(err);
            done();
          });
      });
  });
});
