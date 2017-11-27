import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import users from '../server/seeders/userSeeder';
import recipes from '../server/seeders/recipeSeeder';
import postReview from '../server/seeders/reviewSeeder';
import categories from '../server/seeders/categorySeeder';

process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const should = require('chai').should();
// This agent refers to PORT where program is runninng.
const server = supertest.agent(app);
const rootURL = '/api/v1';
const usersUrl = `${rootURL}/users`;
const favoritesUrl = `${rootURL}/favorites`;
const recipesUrl = `${rootURL}/recipes`;
const reviewsUrl = `${rootURL}/reviews`;
const categoriesUrl = `${usersUrl}/categories`;
const signupUrl = `${rootURL}/users/signup`;
const signinUrl = `${rootURL}/users/signin`;
const [validUsersLogin, testValidUsers] = [users.validUsersLogin, users.testValidUsers];
const [addRecipe, updateRecipe] = [recipes.addRecipe, recipes.updateRecipe];
const userToken = [];
let testData;
const invalidToken = jwt.sign({
  userID: 15,
}, 'jsninja', {
  expiresIn: '3 days'
});
const expiredToken = jwt.sign({
  userID: 15,
}, 'jsninja', {
  expiresIn: '2s'
});

describe('User Registration & Login', () => {
  it('should return message for successful account creation', (done) => {
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[1])
      .end((err, res) => {
        res.status.should.equal(201);
        expect(res.body.message).to.equal('User account successfully created.');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status for successfully login', (done) => {
    server
      .post(signinUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validUsersLogin[1])
      .end((err, res) => {
        res.status.should.equal(200);
        userToken[0] = res.body.authToken;
        res.body.message.should.equal('Authentication & Login successful');
        if (err) return done(err);
        done();
      });
  });
  it('should return message for successful account creation', (done) => {
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[4])
      .end((err, res) => {
        res.status.should.equal(201);
        expect(res.body.message).to.equal('User account successfully created.');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status for successfully login', (done) => {
    server
      .post(signinUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validUsersLogin[2])
      .end((err, res) => {
        res.status.should.equal(200);
        userToken[1] = res.body.authToken;
        res.body.message.should.equal('Authentication & Login successful');
        if (err) return done(err);
        done();
      });
  });
  it('should return message for successful account creation', (done) => {
    server
      .post(signupUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testValidUsers[5])
      .end((err, res) => {
        res.status.should.equal(201);
        expect(res.body.message).to.equal('User account successfully created.');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status for successfully login', (done) => {
    server
      .post(signinUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validUsersLogin[3])
      .end((err, res) => {
        res.status.should.equal(200);
        userToken[2] = res.body.authToken;
        res.body.message.should.equal('Authentication & Login successful');
        if (err) return done(err);
        done();
      });
  });
});
describe('Create Recipe', () => {
  it('should return a invalid token message', (done) => {
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(addRecipe[0])
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('No token provided!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 403 status for an invalid  token', (done) => {
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', invalidToken)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(addRecipe[0])
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('invalid signature');
        if (err) return done(err);
        done();
      });
  });
  // check if a token(expired) not on the user table is used
  it('return 403 for expired user token used', (done) => {
    setTimeout(() => {
      server
        .post(recipesUrl)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', expiredToken)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(addRecipe[0])
        .end((err, res) => {
          expect(res.status).to.equal(403);
          if (err) return done(err);
          done();
        });
    }, 3000);
  });
  it('should return 201 status for adding recipe successfully', (done) => {
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(addRecipe[0])
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Recipe Added SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 201 status for adding recipe successfully', (done) => {
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(addRecipe[1])
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Recipe Added SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 201 status for adding recipe successfully', (done) => {
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(addRecipe[1])
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Recipe Added SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 status for null recipeName field', (done) => {
    testData = Object.assign({}, addRecipe[0]);
    delete testData.recipeName;
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('recipe name field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 status for an empty ingredients field', (done) => {
    testData = Object.assign({}, addRecipe[0]);
    testData.ingredients = '';
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('ingredients field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 status for an empty directions field', (done) => {
    testData = Object.assign({}, addRecipe[0]);
    testData.directions = '';
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('directions field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 status for a negative views number', (done) => {
    testData = Object.assign({}, addRecipe[0]);
    testData.views = -1;
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('views cannot be a negative number');
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 status for a negative upvote number', (done) => {
    testData = Object.assign({}, addRecipe[0]);
    testData.upvotes = -3;
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('upvotes cannot be a negative number');
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 status for a negative downvote number', (done) => {
    testData = Object.assign({}, addRecipe[0]);
    testData.downvotes = -5000;
    server
      .post(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('downvotes cannot be a negative number');
        if (err) return done(err);
        done();
      });
  });
});
describe('Update Recipe', () => {
  it('should return 400 status for a non existing user Id', (done) => {
    server
      .put(`${recipesUrl}/6`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(updateRecipe[0])
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Recipe Not Found!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status for SuccessFullly updating a recipe', (done) => {
    server
      .put(`${recipesUrl}/1`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(updateRecipe[0])
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Recipe Updated SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  // user cannot update another users recipe
  it('should return 400 status for trying to update another user recipe', (done) => {
    server
      .put(`${recipesUrl}/2`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(updateRecipe[0])
      .end((err, res) => {
        res.status.should.equal(400);
        if (err) return done(err);
        done();
      });
  });
  // Deleting a recipe
  it('return 200 status for SuccessFullly deleting a recipe', (done) => {
    server
      .delete(`${recipesUrl}/1`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Recipe Deleted SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  // user cannot delete another users recipe
  it('should return 400 status for trying to delete another user recipe', (done) => {
    server
      .put(`${recipesUrl}/2`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(updateRecipe[0])
      .end((err, res) => {
        res.status.should.equal(400);
        if (err) return done(err);
        done();
      });
  });
});
describe('Get Recipe', () => {
  it('should return 200 status for retrieving user recipe', (done) => {
    server
      .get(`${recipesUrl}/users`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('All User Recipes Retrieved SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status for retrieving user recipe', (done) => {
    server
      .get(`${recipesUrl}/users`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[2])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('No recipe found for user');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status for retrieving a recipe by its id', (done) => {
    server
      .get(`${recipesUrl}/2`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Recipe Retrieved SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should show the  number of times recipe has been viewed', (done) => {
    server
      .get(`${recipesUrl}/2`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.recipeList.views.should.equal(2);
        if (err) return done(err);
        done();
      });
  });
  it('should retrieve all recipes successfully', (done) => {
    server
      .get(recipesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('All Recipes Retrieved SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should retrieve all top recipes by upvotes successfully', (done) => {
    server
      .get(`${recipesUrl}?sort=upvotes&order=descending`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('All Top Recipes Retrieved SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should retrieve all recipes by ingredients', (done) => {
    server
      .get(`${recipesUrl}?ingredients=maggi`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Recipes Retrieved SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should retrieve all top recipes by upvotes successfully', (done) => {
    server
      .get(`${recipesUrl}?ingredients= maggi, rice`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Recipes Retrieved SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should get a message for invalid ingredient search', (done) => {
    server
      .get(`${recipesUrl}?ingredients=palm kernel`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('No recipe matches your search');
        if (err) return done(err);
        done();
      });
  });
  it('should get a 404 status for invalid ingredient search', (done) => {
    server
      .get(`/2/${recipesUrl}?ingredients=/2`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(404);
        if (err) return done(err);
        done();
      });
  });
  it('should get a message for invalid ingredient search', (done) => {
    server
      .get(`${recipesUrl}?ingredients`)
      .set('Connection', 'keep alive')
      .query({
        ingredients: 'sort'
      })
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(500);
        if (err) return done(err);
        done();
      });
  });
});

describe('Review a recipe', () => {
  it('should return 400 status for a null message field', (done) => {
    testData = Object.assign({}, postReview[0]);
    delete testData.message;
    server
      .post(`${recipesUrl}/2/reviews`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('review field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return 404 status for non existent recipe', (done) => {
    server
      .post(`${recipesUrl}/8/reviews`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(postReview[0])
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Recipe Not Found!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 201 status for posting a review for a recipe', (done) => {
    testData = Object.assign({}, postReview[1]);
    testData.recipeId = 2;
    server
      .post(`${recipesUrl}/2/reviews`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Review Posted Successfully');
        if (err) return done(err);
        done();
      });
  });
  it('should return 201 status for posting a review for a recipe', (done) => {
    testData = Object.assign({}, postReview[1]);
    testData.recipeId = 2;
    server
      .post(`${recipesUrl}/2/reviews`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Review Posted Successfully');
        if (err) return done(err);
        done();
      });
  });
  it('should return 201 status for posting a review for a recipe', (done) => {
    testData = Object.assign({}, postReview[1]);
    testData.recipeId = 3;
    server
      .post(`${recipesUrl}/3/reviews`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Review Posted Successfully');
        if (err) return done(err);
        done();
      });
  });
  it('should return 201 status for posting a review for a recipe', (done) => {
    testData = Object.assign({}, postReview[1]);
    testData.recipeId = 3;
    server
      .post(`${recipesUrl}/3/reviewsdddd`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(404);
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 status for retrieving all recipe reviews', (done) => {
    server
      .get(reviewsUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('All Reviews Retrieved SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status for retrieving all reviews for a particular recipe', (done) => {
    server
      .get(`${reviewsUrl}/2`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Recipe reviews Retrieved SuccessFullly!');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message for trying to retrieve a non-existent recipe review', (done) => {
    server
      .get(`${reviewsUrl}/6`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        res.body.message.should.equal('No review for this recipe!');
        if (err) return done(err);
        done();
      });
  });
});
describe('Create Category', () => {
  it('should return a invalid token message', (done) => {
    server
      .post(categoriesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(categories[0])
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('No token provided!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 403 status for an invalid  token', (done) => {
    server
      .post(categoriesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', invalidToken)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(categories[0])
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('invalid signature');
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 status for a null category name field', (done) => {
    testData = Object.assign({}, categories[0]);
    delete testData.name;
    server
      .post(categoriesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(testData)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('category name field cannot be empty');
        if (err) return done(err);
        done();
      });
  });
  it('should return 201 status for creating a category successfully', (done) => {
    server
      .post(categoriesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(categories[0])
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Category created Successfully');
        if (err) return done(err);
        done();
      });
  });
  it('should return 201 status for creating a category successfully', (done) => {
    server
      .post(categoriesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(categories[0])
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Category created Successfully');
        if (err) return done(err);
        done();
      });
  });
  it('should return 404 status for creating category with an invalid user account', (done) => {
    server
      .post(`/2/2${categoriesUrl}/6`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send(categories[0])
      .end((err, res) => {
        res.status.should.equal(404);
        if (err) return done(err);
        done();
      });
  });
});
describe('FavoriteRecipe', () => {
  it('should return 404 status for non existent recipe', (done) => {
    server
      .post(`${recipesUrl}/8/1/favorites`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send({})
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Recipe Not Found!');
        if (err) return done(err);
        done();
      });
  });
  it('should add recipe to uncategorized group if an invalid category is supplied', (done) => {
    server
      .post(`${recipesUrl}/2/67/favorites`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        recipeId: 2,
        categoryId: 67
      })
      .end((err, res) => {
        res.status.should.equal(201);
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 status for user trying to favorite a recipe more than once', (done) => {
    server
      .post(`${recipesUrl}/2/1/favorites`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send({})
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Recipe already favorited by user!');
        if (err) return done(err);
        done();
      });
  });
  it('should return 200 status for retrieving user favorite recipes', (done) => {
    server
      .get(favoritesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('User Favorite recipes retrieved Successfully');
        if (err) return done(err);
        done();
      });
  });
  it('should return a message if user doesnt not have any favorite recipe', (done) => {
    server
      .get(favoritesUrl)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.body.message.should.equal('There are no favourite recipe for this user');
        if (err) return done(err);
        done();
      });
  });
});
describe('Vote a recipe', () => {
  it('allows logged in user upvote a posted recipe', (done) => {
    server
      .put(`${recipesUrl}/2/votes`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.upvote).to.equal(1);
        expect(res.body.downvote).to.equal(0);
        expect(res.body.message).to.be.equal('Your vote has been recorded');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user remove his upvote on a posted recipe', (done) => {
    server
      .put(`${recipesUrl}/2/votes`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.upvote).to.equal(0);
        expect(res.body.downvote).to.equal(0);
        expect(res.body.message).to.be.equal('Your vote has been removed');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user downvote a posted recipe', (done) => {
    server
      .put(`${recipesUrl}/2/votes?sort=downvotes`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.upvote).to.equal(0);
        expect(res.body.downvote).to.equal(1);
        expect(res.body.message).to.be.equal('Your vote has been recorded');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user remove downvote on a posted recipe', (done) => {
    server
      .put(`${recipesUrl}/2/votes?sort=downvotes`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.upvote).to.equal(0);
        expect(res.body.downvote).to.equal(0);
        expect(res.body.message).to.be.equal('Your vote has been removed');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user upvote a posted recipe', (done) => {
    server
      .put(`${recipesUrl}/2/votes`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.upvote).to.equal(1);
        expect(res.body.downvote).to.equal(0);
        expect(res.body.message).to.be.equal('Your vote has been recorded');
        if (err) return done(err);
        done();
      });
  });
  it('allows user that has upvoted to downvote same recipe', (done) => {
    server
      .put(`${recipesUrl}/2/votes?sort=downvotes`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[0])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.upvote).to.equal(0);
        expect(res.body.downvote).to.equal(1);
        expect(res.body.message).to.be.equal('Your vote has been recorded');
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user downvote a posted recipe', (done) => {
    server
      .put(`${recipesUrl}/2/votes?sort=downvotes`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.upvote).to.equal(0);
        expect(res.body.downvote).to.equal(2);
        expect(res.body.message).to.be.equal('Your vote has been recorded');
        if (err) return done(err);
        done();
      });
  });
  it('allows user upvote same recipe he/she has downvoted', (done) => {
    server
      .put(`${recipesUrl}/2/votes`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userToken[1])
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.upvote).to.equal(1);
        expect(res.body.downvote).to.equal(1);
        expect(res.body.message).to.be.equal('Your vote has been recorded');
        if (err) return done(err);
        done();
      });
  });
});
