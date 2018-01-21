import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../app';

const server = supertest.agent(app);

describe('Catch-Other routes', () => {
  it('should respond with Status connected ok', (done) => {
    server
      .get('/api')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        if (err) return done(err);
        done();
      });
  });

  it('should send html for all non-api routes', (done) => {
    server
      .get('/heyyo')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.not.be.a('JSON');
        done();
      });
  });

  it('should send html for api doc route', (done) => {
    server
      .get('/api-docs')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.not.be.a('JSON');
        done();
      });
  });

  it('should return 404 error for all nonexistent api GET routes', (done) => {
    server
      .get('/api/v1/goyruuruuru')
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).to.not.be.a('Route not found');
        done();
      });
  });

  it('should return 404 error for all nonexistent api POST routes', (done) => {
    server
      .post('/api/heyyo')
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).to.not.be.a('Route not found');
        done();
      });
  });
});
