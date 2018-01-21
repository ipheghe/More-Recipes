
import db from '../../models';
import {
  seedUsers,
  seedRecipes,
  seedCategories,
  seedFavorites 
} from './seeds';
const {
  User,
  Recipe,
  Category,
  Favorite,
  Vote
} = db;

export const populateUsers = () => {
  User.bulkCreate(seedUsers.registered).then(() => {
    return
  });
};

export const populateRecipes = () => {
  Recipe.bulkCreate(seedRecipes).then(() => {
    return
  });
};

export const populateCategories = () => {
  Category.bulkCreate(seedCategories).then(() => {
    return
  });
};

export const populateFavorites = () => {
  Favorite.bulkCreate(seedFavorites).then(() => {
    return
  });
};

export const doBeforeAll = () => {
  before((done) => {
    User.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    Recipe.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    Category.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    Favorite.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    Vote.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    populateUsers();
    populateRecipes();
    populateCategories();

    done();
  });
};