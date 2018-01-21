import { expect } from 'chai';
import db from '../../models';
import { doBeforeAll } from '../seeders/testHooks';

const { User } = db;

describe('User model', () => {
  doBeforeAll();

  it('should create a user instance', (done) => {
    User.create({
      username: 'testuser',
      password: 'testpass',
      fullName: 'User Test',
      mobileNumber: 234702384899,
      email: 'testing1@example.com'
    })
      .then((user) => {
        expect(user.id).to.be.a('number');
        expect(user.username).to.equal('testuser');
        expect(user.email).to.equal('testing1@example.com');
        done();
      });
  });

  it('should be the class of the created instance', (done) => {
    User.create({
      username: 'testuser2',
      password: 'testpass',
      fullName: 'User Test2',
      mobileNumber: 234702384891,
      email: 'testing2@example.com'
    })
      .then((user) => {
        expect(user instanceof User).to.equal(true);
        done();
      }).catch(err => done(err));
  });
});
