import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];

describe('<<< Categories Controller: ', () => {
  describe('Create Uncategorized category: ', () => {
    it(`should return a success message for
        creating a category successfully`, (done) => {
        server
          .post('/api/v1/user/unCategorized')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .type('form')
          .send({ userId: 101 })
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should.equal('Category created Successfully');
            if (err) return done(err);
            done();
          });
      });

    it('should not create uncategorized category for user twice', (done) => {
      server
        .post('/api/v1/user/unCategorized')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ userId: 101 })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Category name exists!');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Create Category: ', () => {
    it(`should return a success message for
        creating a category successfully`, (done) => {
        server
          .post('/api/v1/user/category')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({ name: 'Cakes' })
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should.equal('Category created Successfully');
            if (err) return done(err);
            done();
          });
      });

    it('should not create user with same category name twice', (done) => {
      server
        .post('/api/v1/user/category')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({ name: 'Cakes' })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Category name exists!');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Update Category: ', () => {
    it(`displays success message after
       updating category name successfully`, (done) => {
        server
          .put('/api/v1/user/category/101')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({ name: 'Wine' })
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.category.name.should.equal('Wine');
            res.body.message.should
              .equal('category name changed SuccessFullly!');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Delete Category: ', () => {
    it(`displays success message after
       deleting category successfully`, (done) => {
        const token = tokens[1];
        server
          .delete('/api/v1/user/category/102')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', token)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should.equal('Category deleted SuccessFullly!');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Get User Categories: ', () => {
    it('retrieves all user categories successfully', (done) => {
      server
        .get('/api/v1/categories/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should
            .equal('All User Categories Retrieved SuccessFullly!');
          res.body.userCategories.should.be.an('array');
          res.body.userCategories.length.should.equal(3);
          if (err) return done(err);
          done();
        });
    });

    it('displays a message if user has no category yet', (done) => {
      const token = tokens[1];
      server
        .get('/api/v1/categories/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', token)
        .type('form')
        .end((err, res) => {
          res.body.message.should
            .equal('No category found for user');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get User Category: ', () => {
    it('should retrieve user category successfully', (done) => {
      server
        .get('/api/v1/category/user/101')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should
            .equal('User Category Retrieved SuccessFullly!');
          res.body.userCategory[0].should.be.an('object');
          if (err) return done(err);
          done();
        });
    });

    it(`displays a message if the category that
       the user requests for is  not available`, (done) => {
        const token = tokens[1];
        server
          .get('/api/v1/category/user/102')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', token)
          .type('form')
          .end((err, res) => {
            res.body.message.should
              .equal('Category Not Found!');
            if (err) return done(err);
            done();
          });
      });
  });
});
