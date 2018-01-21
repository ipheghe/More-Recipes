import { expect } from 'chai';
import db from '../../models';

const { Recipe } = db;

describe('Recipe model', () => {
  it('should create a user instance', (done) => {
    Recipe.create({
      name: 'Beans',
      description: 'This recipe is very popular in the ' +
      'south south part of Nigeria',
      ingredients: 'palm kernel, assorted meat, maggi, palm oil',
      directions: 'pour palm oil in pot, blanch oil for 10mins',
      imageUrl: 'dist/image1',
      userId: 103
    })
      .then((recipe) => {
        expect(recipe.id).to.be.a('number');
        expect(recipe.name).to.equal('Beans');
        expect(recipe.userId).to.equal(103);
        done();
      });
  });

  it('should be the class of the created instance', (done) => {
    Recipe.create({
      name: 'Spaghetti',
      description: 'This recipe is very popular in the ' +
      'south south part of Nigeria',
      ingredients: 'palm kernel, assorted meat, maggi, palm oil',
      directions: 'pour palm oil in pot, blanch oil for 10mins',
      imageUrl: 'dist/image1',
      userId: 103
    })
      .then((recipe) => {
        expect(recipe instanceof Recipe).to.equal(true);
        done();
      }).catch(err => done(err));
  });
});
