// import bcrypt from 'bcryptjs';
// import models from '../server/models';
// import jwt from 'jsonwebtoken';
// import app from '../app';

// process.env.NODE_ENV = 'test';

// const expect = require('chai').expect;
// const should = require('chai').should();
// const supertest = require("supertest");

// // This agent refers to PORT where program is runninng.
// const server = supertest.agent(app);

// models.User.destroy({
//   where: {},
//   cascade: true,
//   truncate: true
// });
// models.Recipe.destroy({
//   where: {},
//   cascade: true,
//   truncate: true
// });
// models.Category.destroy({
//   where: {},
//   cascade: true,
//   truncate: true
// });
// models.Review.destroy({
//   where: {},
//   cascade: true,
//   truncate: true
// });
// models.Favorite.destroy({
//   where: {},
//   cascade: true,
//   truncate: true
// });

// let testData;
// let data = {};
// let recipeData = {};
// let reviewData = {};
// let favoriteData = {};
// let voteData = {};
// let categoryData = {};
// let userToken,token;
// let userId, id;
//          let recipeData2= {
//             recipeName: 'vegetable soup',
//             recipeDescription: 'A nice native dish',
//             ingredients: 'bitter leaf, maggi, pepper, stock fish',
//             directions: 'put palm oil in pot, leave for some minutes',
//             imageUrl: 'no image',
//             views: 0,
//             upvotes: 0,
//             downvotes: 0,
//             notification: 0,
//             userId: 1,
//           };

// describe('API Integration Tests', () => {
//     it("should return home page",(done) => {
//       // calling home page api
//       server
//       .get("/api")
//       .expect("Content-type",/json/)
//       .expect(200) // THis is HTTP response
//         .end((err,res) => {
//         // HTTP status should be 200
//         res.status.should.equal(200);
//         // Error key should be false.
//         res.body.error.should.equal(false);
//         // Message should return Welcome to the More Recipes!
//         res.body.message.should.eql('Welcome to the More Recipes!');
//         done();
//       });
//     });
//   describe('User signup',() => {
//         beforeEach(() => {
//           data = {
//             username: 'mikee',
//             password: '1231bcd',
//             firstName: 'Ada',
//             lastName: 'Amadi',
//             mobileNumber: 2348023451234,
//             email: 'example1@user.com',
//           };
//         });
//     it('should return 200 for a successful account creation', (done) => {
//         server
//         .post('/api/users/signup/')
//         .send(data)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((err,res) => {
//           res.status.should.equal(200);
//           console.log(res.status);
//           done();
//         });
//     });
//     it('should return a message for null username field', (done) => {
//       testData = Object.assign({},data);
//       testData.username = '';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.userData.firstName.should.eql('Ada');
//           res.body.message.should.equal('username field cannot be empty');
//           done();
//         });
//     });
//     it('should return a message for null password field', (done) => {
//       testData = Object.assign({},data);
//       delete testData.password;
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('password field cannot be empty');
//           done();
//         });
//     });
//     it('should return a message for null firstName field', (done) => {
//       testData = Object.assign({},data);
//       testData.firstName = '';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('firstName field cannot be empty');
//           done();
//         });
//     });
//     it('should return a message for null lastName field', (done) => {
//       testData = Object.assign({},data);
//       delete testData.lastName;
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('lastName field cannot be empty');
//           done();
//         });
//     });
//     it('should return a message for null mobile field', (done) => {
//       testData = Object.assign({},data);
//       delete testData.mobileNumber;
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('mobile field cannot be empty');
//           done();
//         });
//     });

//     it('should return a message for null email field', (done) => {
//       testData = Object.assign({},data);
//       testData.email = '';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('email field cannot be empty');
//           done();
//         });
//     });

//     it('should return a message for invalid username length', (done) => {
//       testData = Object.assign({},data);
//       testData.username = 'as';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('username must have more than 3 characters');
//           done();
//         });
//     });
//     it('should return a message for invalid password length', (done) => {
//       testData = Object.assign({},data);
//       testData.password = 'as';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('password must have more than 3 characters');
//           done();
//         });
//     });
//    it('should return a message for invalid first name length', (done) => {
//       testData = Object.assign({},data);
//       testData.firstName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+
//       'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
//       'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('firstName must have less than 51 characters');
//           done();
//         });
//     });
//     it('should return a message for invalid last name length', (done) => {
//       testData = Object.assign({},data);
//       testData.lastName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+
//       'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
//       'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('lastName must have less than 51 characters');
//           done();
//         });
//     });
//     it('should return 400 status error for adding spaces inbetween username', (done) => {
//       testData = Object.assign({},data);
//       testData.username = ' 11 jja';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.error.should.equal('Validation error: Username must start with a letter and have no spaces.');
//           done();
//         });
//     });
//     it('should return a 400 status for entering an existing username', (done) => {
//       testData = Object.assign({},data);
//       testData.email = 'jack@yahoo.com';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.error.should.equal('Username already exists');
//           done();
//         });
//     });
//     it('should return a message for last name field containing numbers', (done) => {
//       testData = Object.assign({},data);
//       testData.lastName = '112'+12;
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.error[0].should.equal('V');
//           done();
//         });
//     });
//   });
//   describe('User signin',() => {
//         beforeEach(() => {
//           data = {
//             username: 'mikee',
//             password: '1231bcd',
//           };
//         });
//     it('should return a message invalid username', (done) => {
//       testData = Object.assign({},data);
//       testData.username =  'enny';
//         server
//         .post('/api/users/signin/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(404)
//         .end((err,res) => {
//           res.status.should.equal(404);
//           res.body.message.should.equal('Authentication failed. Username is incorrect or does not exist');
//           done();
//         });
//     });
//     it('should return a message for null username field', (done) => {
//       testData = Object.assign({},data);
//       testData.username = '';
//         server
//         .post('/api/users/signin/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('username field cannot be empty');
//           done();
//         });
//     });
//     it('should return a message for null password field', (done) => {
//       testData = Object.assign({},data);
//       delete testData.password;
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('password field cannot be empty');
//           done();
//         });
//     });
//     it('should return a message for null password field', (done) => {
//       testData = Object.assign({},data);
//       testData.password = '';
//         server
//         .post('/api/users/signup/')
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('password field cannot be empty');
//           done();
//         });
//     });
//     it('should return 200 status for sccessfully login', (done) => {
//         server
//         .post('/api/users/signin/')
//         .send(data)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((err,res) => {
//           res.status.should.equal(200);
//           userToken = res.body.authToken;
//           console.log(userToken);
//           res.body.message.should.equal('Authentication & Login successful');
//           done();
//         });
//     });
//     it('should return 400 status for unsuccessful login', (done) => {
//         server
//         .post('/api/users/signin/')
//         .send({
//           id: 67,
//           username: 'mikee',
//           password: 'aa1bcdddddd',
//         })
//         .expect("Content-type",/json/)
//         .expect(404)
//         .end((err,res) => {
//           res.status.should.equal(404);
//           res.body.message.should.equal('Authentication failed. Incorrect password');
//           done();
//         });
//     });
//   });
//    describe('Create Recipe',() => {
//         beforeEach(() => {
//           recipeData = {
//             recipeName: 'egusi soup',
//             recipeDescription: 'A nice native dish',
//             ingredients: 'bitter leaf, maggi, pepper, stock fish',
//             directions: 'put palm oil in pot, leave for some minutes',
//             imageUrl: 'no image',
//             views: 0,
//             upvotes: 0,
//             downvotes: 0,
//             notification: 0,
//             userId: 1,
//           };
//         });
//     it('should return a invalid token message', (done) => {
//         server
//         .post('/api/recipes/')
//         .send(recipeData)
//         .expect("Content-type",/json/)
//         .expect(403)
//         .end((err,res) => {
//           res.status.should.equal(403);
//           res.body.message.should.equal('No token provided');
//           done();
//         });
//     });
//     it('should return 201 for adding recipe successfully', (done) => {
//         server
//         .post('/api/recipes/')
//         .set('Connection', 'keep alive')
//         .set('Accept', 'application/json')
//         .set({'x-access-token':userToken})
//         .set('Content-Type', 'application/json')
//         .type('form')
//         .send(recipeData)
//         .expect(201)
//         .end((err,res) => {
//           res.status.should.equal(201);
//           res.body.message.should.equal('Recipe Added SuccessFullly!');
//           id = res.body.recipeData.id;
//           console.log(id);
//           done();
//         });
//     });
//     it('should return 403 status for an invalid  token', (done) => {
//         server
//         .post('/api/recipes/')
//         .set('Connection', 'keep alive')
//         .set('Accept', 'application/json')
//         .set({'x-access-token':'sssssssssssssssssssssssfffffffffff'})
//         .set('Content-Type', 'application/json')
//         .type('form')
//         .send(recipeData)
//         .expect(403)
//         .end((err,res) => {
//           res.status.should.equal(403);
//           done();
//         });
//     });
//     it('should return 400 status for null recipeName field', (done) => {
//       testData = Object.assign({},recipeData);
//       delete testData.recipeName;
//         server
//         .post('/api/recipes/')
//         .set({'x-access-token':userToken})
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('recipe name field cannot be empty');
//           done();
//         });
//     });
//     it('return 400 status for an empty ingredients field', (done) => {
//       testData = Object.assign({},recipeData);
//       testData.ingredients = '';
//         server
//         .post('/api/recipes/')
//         .set({'x-access-token':userToken})
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('ingredients field cannot be empty');
//           done();
//         });
//     });
//     it('return 400 status for an empty directions field', (done) => {
//       testData = Object.assign({},recipeData);
//       testData.directions = '';
//         server
//         .post('/api/recipes/')
//         .set({'x-access-token':userToken})
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('directions field cannot be empty');
//           done();
//         });
//     });
//     it('return 400 status for a negative views number', (done) => {
//       testData = Object.assign({},recipeData);
//       testData.views = -1;
//         server
//         .post('/api/recipes/')
//         .set({'x-access-token':userToken})
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('views cannot be a negative number');
//           done();
//         });
//     });
//     it('return 400 status for a negative upvote number', (done) => {
//       testData = Object.assign({},recipeData);
//       testData.upvotes = -3;
//         server
//         .post('/api/recipes/')
//         .set({'x-access-token':userToken})
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('upvotes cannot be a negative number');
//           done();
//         });
//     });
//     it('should return 400 status for a negative downvote number', (done) => {
//       testData = Object.assign({},recipeData);
//       testData.downvotes = -5000;
//         server
//         .post('/api/recipes/')
//         .set({'x-access-token':userToken})
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('downvotes cannot be a negative number');
//           done();
//         });
//     });
//   });
//    describe('Update Recipe',() => {
//     it('should return 400 status for a non existing user Id', (done) => {
//       testData = Object.assign({},recipeData);
//         server
//         .put('/api/recipes/50')
//         .set({'x-access-token':userToken})
//         .expect("Content-type",/json/)
//         .expect(404)
//         .end((err,res) => {
//           res.status.should.equal(404);
//           res.body.message.should.equal('Recipe Not Found!');
//           done();
//         });
//     });
//     it('should return 200 status for SuccessFullly updating a recipe', (done) => {
//       testData = Object.assign({},recipeData);
//       testData.recipeName = 'banga soup';
//       testData.recipeDescription = 'A very popular dish from the southern part of Nigeria'
//         server
//         .put('/api/recipes/1')
//         .set({'x-access-token':userToken})
//         .send(testData)
//         .expect("Content-type",/json/)
//         .end((err,res) => {
//           res.status.should.equal(200);
//           res.body.message.should.equal('Recipe Upated SuccessFullly!');
//           if (err) return done(err);
//           done();
//         });
//     });
//     //Deleting a recipe
//     it('return 200 status for SuccessFullly deleting a recipe', (done) => {
//       testData = Object.assign({},recipeData);
//         server
//         .delete('/api/recipes/1')
//         .set({'x-access-token':userToken})
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((err,res) => {
//           res.status.should.equal(200);
//           res.body.message.should.equal('Recipe Deleted SuccessFullly!');
//           if (err) return done(err);
//           done();
//         });
//     });
//   });
//   describe('Post Review',() => {

//         beforeEach(() => {
//           reviewData = {
//             message: 'looks delicious'
//           };
//         });

//       it('return 201 for adding recipe successfully', (done) => {
//         server
//         .post('/api/recipes/')
//         .set('Connection', 'keep alive')
//         .set('Accept', 'application/json')
//         .set({'x-access-token':userToken})
//         .set('Content-Type', 'application/json')
//         .type('form')
//         .send(recipeData2)
//         .expect(201)
//         .end((err,res) => {
//           done();
//         });
//     });
//     it('return 400 status for null message field', (done) => {
//         server
//         .post('/api/recipes/2/reviews')
//         .set('Connection', 'keep alive')
//         .set('Accept', 'application/json')
//         .set({'x-access-token':userToken})
//         .set('Content-Type', 'application/json')
//         .type('form')
//         .send({
//           message: null,
//           recipeId: 2
//           })
//         .expect(function(res){
//           res.status.should.equal(200);
//           res.body.message.should.equal('review field cannot be empty');
//         })
//         .end((err,res) => {
//           done();
//         });
//     });
//     it('return 201 status for posting review successfully', (done) => {
//         testData = Object.assign({},reviewData);
//         server
//         .post('/api/recipes/2/reviews/')
//         .set({'x-access-token':userToken})
//         .send({
//           message: 'nice meal',
//           recipeId: 2
//           })
//         .set('Content-Type', 'application/json')
//         .expect(201)
//         .end((err,res) => {
//           res.status.should.equal(201);
//           console.log(JSON.stringify(res.body));
//           if (err) return done(err);
//           done();
//         });
//     });
//     it('return 400 status for invalid Recipe Id', (done) => {
//       testData = Object.assign({},reviewData);
//         server
//         .post('/api/recipes/48/reviews')
//         .set('Connection', 'keep alive')
//         .set('Accept', 'application/json')
//         .set({'x-access-token':userToken})
//         .set('Content-Type', 'application/json')
//         .type('form')
//         .send(testData)
//         .end((err,res) => {
//           res.body.message.should.equal('Recipe Not Found!');
//           done();
//         });
//     });
//     it('return 200 status for retrieving all reviews successfully', (done) => {
//         server
//         .get('/api/reviews/')
//         .set({'x-access-token':userToken})
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((err,res) => {
//           res.status.should.equal(200);
//           res.body.message.should.equal('All Reviews Retrieved SuccessFullly!');
//           done();
//         });
//     });
//   });
//   describe('Add Category',() => {
//         beforeEach(() => {
//           categoryData = {
//             name: 'Local Dish',
//           };
//         });
//     it('return 400 status for null category name field', (done) => {
//       testData = Object.assign({},categoryData);
//       testData.name = '';
//         server
//         .post('/api/users/categories')
//         .set({'x-access-token':userToken})
//         .send(testData)
//         .expect("Content-type",/json/)
//         .expect(400)
//         .end((err,res) => {
//           res.status.should.equal(400);
//           res.body.message.should.equal('category name field cannot be empty');
//           done();
//         });
//     });
//     it('return 201 status for adding a category successfully', (done) => {
//         server
//         .post('/api/users/categories')
//         .set({'x-access-token':userToken})
//         .send(categoryData)
//         .expect("Content-type",/json/)
//         .expect(201)
//         .end((err,res) => {
//           res.status.should.equal(201);
//           console.log(reviewData);
//           console.log(userToken);
//           res.body.message.should.equal('Category created Successfully');
//           done();
//         });
//     });
//   });
//   describe('Add Favorites',() => {

//         beforeEach(() => {
//           favoriteData = {
//             recipeId: 2,
//             categoryId: 1,
//             userId: 1
//           };
//         });
//     it('return 201 for adding recipe successfully', (done) => {
//         server
//         .post('/api/recipes/')
//         .set('Connection', 'keep alive')
//         .set('Accept', 'application/json')
//         .set({'x-access-token':userToken})
//         .set('Content-Type', 'application/json')
//         .type('form')
//         .send(recipeData2)
//         .expect(201)
//         .end((err,res) => {
//           done();
//         });
//     });
//     it('should return 404 status for favoriting an invalid recipe', (done) => {
//         testData = Object.assign({},favoriteData);
//           server
//           .post('/api/recipes/8/1/favorites')
//           .set({'x-access-token':userToken})
//           .send(testData)
//           .expect("Content-type",/json/)
//           .expect(404)
//           .end((err,res) => {
//             res.status.should.equal(404);
//             res.body.message.should.equal('Recipe Not Found!');
//             done();
//           });
//     });
//   // it('allows logged in user add recipe to favorite and category', (done) => {
//   //   server
//   //     .post('/api/recipes/2/1/favorites')
//   //     .set('Connection', 'keep alive')
//   //     .set('Accept', 'application/json')
//   //     .set('x-access-token', userToken)
//   //     .set('Content-Type', 'application/json')
//   //     .type('form')
//   //     .send()
//   //     .end((err, res) => {
//   //       expect(res.statusCode).to.equal(201);
//   //       expect(res.body.status).to.equal('success');
//   //       expect(res.body.message).to.be.equal('Recipe successfully added to favorites');
//   //       if (err) return done(err);
//   //       done();
//   //     });
//   // });
//   // it('does not allow user add same favorite more than once', (done) => {
//   //   server
//   //     .post('/api/recipes/2/1/favorites')
//   //     .set('Connection', 'keep alive')
//   //     .set('Accept', 'application/json')
//   //     .set('x-access-token', userToken)
//   //     .set('Content-Type', 'application/json')
//   //     .type('form')
//   //     .send()
//   //     .end((err, res) => {
//   //       expect(res.statusCode).to.equal(400);
//   //       expect(res.body.message).to.be.equal('Recipe has already been favorited');
//   //       if (err) return done(err);
//   //       done();
//   //     });
//   // });
//     it('return 200 status for retrieving all users favorite recipes successfully', (done) => {
//       testData = Object.assign({},favoriteData);
//         server
//         .get('/api/users/favorites')
//         .set({'x-access-token':userToken})
//         .send(favoriteData)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((err,res) => {
//           res.status.should.equal(200);
//           res.body.message.should.equal('User Favorite recipes retrieved Successfully');
//           done();
//         });
//     });
//     it('return 200 status for upvoting a recipe', (done) => {
//       voteData = {recipeId: 2, option: true};
//         server
//         .post('/api/recipes/2/votes')
//         .set({'x-access-token':userToken})
//         .send(voteData)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((err,res) => {
//           res.status.should.equal(200);
//           res.body.message.should.equal('Your vote has been recorded');
//           done();
//         });
//     });
//     it('return 200 status for upvoting a recipe', (done) => {
//       voteData = {recipeId: 2, option: false};
//         server
//         .post('/api/recipes/2/votes')
//         .set({'x-access-token':userToken})
//         .send(voteData)
//         .expect("Content-type",/json/)
//         .expect(200)
//         .end((err,res) => {
//           res.status.should.equal(200);
//           res.body.message.should.equal('Your vote has been removed');
//           done();
//         });
//     });
//     it('return 200 status for upvoting a recipe', (done) => {
//       voteData = {recipeId: 7, option: true};
//         server
//         .post('/api/recipes/7/votes')
//         .set({'x-access-token':userToken})
//         .send(voteData)
//         .expect("Content-type",/json/)
//         .expect(404)
//         .end((err,res) => {
//           res.status.should.equal(404);
//           done();
//         });
//     });
//     // get recipes with highest top votes
//     it('show recipes with highest upvote first', (done) => {
//       server
//         .get('/api/recipes')
//         .query({ sort: 'upvotes', order: 'desc' })
//         .set('Connection', 'keep alive')
//         .set('Accept', 'application/json')
//         .set('x-access-token', userToken)
//         .set('Content-Type', 'application/json')
//         .end((err,res) => {
//           expect(res.statusCode).to.equal(200);
//           res.body.message.should.equal('All Top Recipes Retrieved SuccessFullly!');
//           if (err) return done(err);
//           done();
//         });
//     });
//   });
// });

