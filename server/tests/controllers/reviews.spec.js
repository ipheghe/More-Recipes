import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';
import mailTransporter from '../../helpers/mailTransporter';

require('chai').should();

const server = supertest.agent(app);
const authToken = tokens[0];

describe('<<< Reviews Controller: ', () => {
  describe('Post Recipe Review: ', () => {
    it(`should return a success message for
        posting a recipe review  successfully`, (done) => {
        mailTransporter.sendMail = () => Promise.resolve(1);
        server
          .post('/api/v1/recipe/101/review')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .send({ message: 'Lovely meal' })
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should.equal('Review Posted Successfully');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Get Recipe Reviews: ', () => {
    it('retrieves all recipe reviews successfully', (done) => {
      server
        .post('/api/v1/reviews/101')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should
            .equal('Recipe reviews Retrieved SuccessFullly!');
          res.body.reviews.rows.should.be.an('array');
          res.body.reviews.rows.length.should.equal(1);
          if (err) return done(err);
          done();
        });
    });

    it(`displays a message if user has not posted
       any review for a particular recipe`, (done) => {
        server
          .post('/api/v1/reviews/102')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken)
          .type('form')
          .end((err, res) => {
            res.body.message.should
              .equal('No review for this recipe!');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Get All Reviews: ', () => {
    it('should retrieve all reviews successfully', (done) => {
      server
        .get('/api/v1/reviews')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should
            .equal('All Reviews Retrieved SuccessFullly!');
          res.body.reviews.should.be.an('array');
          res.body.reviews.length.should.equal(1);
          if (err) return done(err);
          done();
        });
    });
  });
});
