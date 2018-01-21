import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

const server = supertest.agent(app);
const token1 = tokens[0];
const token2 = tokens[1];

describe('<<< Votes Controller: ', () => {
  describe('Vote a recipe', () => {
    it('should be able to upvote recipe', (done) => {
      server
        .put('/api/v1/recipe/1/vote')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', token1)
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

    it('should not upvote recipe twice', (done) => {
      server
        .put('/api/v1/recipe/1/vote')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', token1)
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

    it('should be able to downvote recipe', (done) => {
      server
        .put('/api/v1/recipe/1/vote?sort=downvotes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', token2)
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
    it('should not downvote recipe twice', (done) => {
      server
        .put('/api/v1/recipe/1/vote?sort=downvotes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', token2)
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
        .put('/api/v1/recipe/1/vote')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', token1)
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
        .put('/api/v1/recipe/1/vote?sort=downvotes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', token1)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.upvote).to.equal(0);
          expect(res.body.downvote).to.equal(1);
          expect(res.body.message).to.be.equal('Your vote has been updated');
          if (err) return done(err);
          done();
        });
    });

    it('allows logged in user downvote a posted recipe', (done) => {
      server
        .put('/api/v1/recipe/1/vote?sort=downvotes')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', token2)
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

    it(`allows logged in user upvote
       same recipe he/she has downvoted`, (done) => {
        server
          .put('/api/v1/recipe/1/vote')
          .set('Connection', 'keep alive')
          .set('Accept', 'application/json')
          .set('x-access-token', token2)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.upvote).to.equal(1);
            expect(res.body.downvote).to.equal(1);
            expect(res.body.message).to.be.equal('Your vote has been updated');
            if (err) return done(err);
            done();
          });
      });
  });
});
