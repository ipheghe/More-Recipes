// const users = require('./users');
// const recipes = require('./recipes');
// const reviews = require('./reviews');
// const favorites = require('./favorites');
// const categories = require('./categories');
// const votes = require('./votes');

// module.exports = {
//   users,
//   recipes,
//   reviews,
//   favorites,
//   categories,
//   votes,
// };

/**
 * import all module dependencies
 */
import { users } from './users';
import { recipes } from './recipes';
import { reviews } from './reviews';
import { categories } from './categories';
import { favorites } from './favorites';
import { votes } from './votes';

/**
 *@export all controllers
 */
export default { users, recipes, reviews, favorites, categories, votes };
