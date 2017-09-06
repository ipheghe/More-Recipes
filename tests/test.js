import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import bcrypt from 'bcryptjs';
import models from '../server/models';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

const myApp = require('../app.js');

const supertest = require("supertest");

// This agent refers to PORT where program is runninng.

const server = supertest.agent("http://localhost:8000");
chai.use(chaiHttp);

models.User.destroy({
  where: {},
  cascade: true,
  truncate: true
});

models.Recipe.destroy({
  where: {},
  cascade: true,
  truncate: true
});

models.Category.destroy({
  where: {},
  cascade: true,
  truncate: true
});

models.Review.destroy({
  where: {},
  cascade: true,
  truncate: true
});

models.Favorite.destroy({
  where: {},
  cascade: true,
  truncate: true
});



let testData;
let data = {};

describe('API Integration Tests', () => {

    it("should return home page",(done) => {

      // calling home page api
      server
      .get("/api")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.error.should.equal(false);
        // Message should return Welcome to the More Recipes!
        res.body.message.should.eql('Welcome to the More Recipes!');
        done();
      });
    });

  describe('User signup',() => {

        beforeEach(() => {
          data = {
            username: 'mikee',
            password: '1231bcd',
            firstName: 'Ada',
            lastName: 'Amadi',
            mobileNumber: 2348023451234,
            email: 'example1@user.com',
          };

        });


    it('return 200 for a successful account creation', (done) => {
        server
        .post('/api/users/signup/')
        .send(data)
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          console.log(res.status);
          done();
        });
    });

    it('return a message for null username field', (done) => {
      testData = Object.assign({},data);
      testData.username = '';
        server
        .post('/api/users/signup/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          res.body.error.should.equal(false);
          res.body.userData.firstName.should.eql('Ada');
          res.body.message.should.equal('username field cannot be empty');
          done();
        });
    });

    it('return a message for null password field', (done) => {
      testData = Object.assign({},data);
      delete testData.password;
        server
        .post('/api/users/signup/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          res.body.error.should.equal(false);
          res.body.message.should.equal('password field cannot be empty');
          done();
        });
    });

    it('return a message for null firstName field', (done) => {
      testData = Object.assign({},data);
      testData.firstName = '';
        server
        .post('/api/users/signup/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          res.body.error.should.equal(false);
          res.body.message.should.equal('firstName field cannot be empty');
          done();
        });
    });

    it('return a message for null lastName field', (done) => {
      testData = Object.assign({},data);
      delete testData.lastName;
        server
        .post('/api/users/signup/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          res.body.error.should.equal(false);
          res.body.message.should.equal('lastName field cannot be empty');
          done();
        });
    });

    it('return a message for null mobile field', (done) => {
      testData = Object.assign({},data);
      delete testData.mobileNumber;
        server
        .post('/api/users/signup/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          res.body.error.should.equal(false);
          res.body.message.should.equal('mobile field cannot be empty');
          done();
        });
    });

    it('return a message for null email field', (done) => {
      testData = Object.assign({},data);
      testData.email = '';
        server
        .post('/api/users/signup/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          res.body.error.should.equal(false);
          res.body.message.should.equal('email field cannot be empty');
          done();
        });
    });

    // it('return a message for invalid password length', (done) => {
    //   testData = Object.assign({},data);
    //   testData.password = String.prototype.substring(1, 3);
    //     server
    //     .post('/api/users/signup/')
    //     .send(testData)
    //     .expect("Content-type",/json/)
    //     .expect(400)
    //     .end(function(err,res){
    //       res.status.should.equal(400);
    //       //res.body.Validation error.should.equal(false);
    //       res.body.message.should.equal('password must have more than 3 characters');
    //       done();
    //     });
    // });

   it('return a message for invalid first name length', (done) => {
      testData = Object.assign({},data);
      testData.firstName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        server
        .post('/api/users/signup/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          res.body.error.should.equal(false);
          res.body.message.should.equal('firstName must have less than 51 characters');
          done();
        });
    });

    it('return a message for invalid last name length', (done) => {
      testData = Object.assign({},data);
      testData.lastName = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        server
        .post('/api/users/signup/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          res.body.error.should.equal(false);
          res.body.message.should.equal('lastName must have less than 51 characters');
          done();
        });
    });

    it('return a message for last name field containing numbers', (done) => {
      testData = Object.assign({},data);
      testData.lastName = '112'+12;
        server
        .post('/api/users/signup/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(400)
        .end(function(err,res){
          res.status.should.equal(400);
          res.body.error[0].should.equal('V');
          done();
        });
    });

  });

  describe('User signin',() => {

        beforeEach(() => {
          data = {
            username: 'mikee',
            password: '1231bcd',
          };

        });

    it('return a message invalid username', (done) => {
      testData = Object.assign({},data);
      testData.username =  'enny';
        server
        .post('/api/users/signin/')
        .send(testData)
        .expect("Content-type",/json/)
        .expect(404)
        .end(function(err,res){
          res.status.should.equal(404);
          res.body.message.should.equal('Authentication failed. Username is incorrect or does not exist');
          done();
        });
    });

    // it('return a message for invalid password', (done) => {
    //   testData = Object.assign({},data);
    //     server
    //     .post('/api/users/signin/')
    //     .send(bcrypt.compareSync('eny', testData.password))
    //     .expect("Content-type",/json/)
    //     .expect(404)
    //     .end(function(err,res){
    //       res.status.should.equal(404);
    //       res.body.error.should.equal(true);
    //       res.body.message.should.equal('Authentication failed. Incorrect password');
    //       done();
    //     });
    // });

  });
});

