export default {
  // user
  user: {
    id: 1,
    username: 'linda',
    password: 'abcde',
    fullName: 'Linda George',
    mobileNumber: 2348034526172,
    email: 'linda@gmail.com',
  },

  IncorrectUser: {
    id: 1,
    username: 'li dd  nda',
    password: '',
    fullName: 'Linda George',
    mobileNumber: 2348034526172,
    email: 'linda@gmail.com',
  },

  invalidPassword: {
    username: 'linda',
    password: 'b b dnb ',
  },

  fetchUser: {
    userData: {
      id: 1,
      username: 'linda',
      password: 'abcde',
      fullName: 'Linda George',
      mobileNumber: 2348034526172,
      email: 'linda@gmail.com',
    }
  },
  userSignin: {
    id: 1,
    username: 'linda',
    password: 'abcde'
  },
  incorrectUser: {
    id: 1,
    username: ' ke',
    password: 'abcde',
    fullName: 'Linda George',
    mobileNumber: 2348034526172,
    email: 'linda@gmail.com',
  },
  changePassword: {
    password: 'abcde',
    newPassword: 'abcdeke'
  },

  // recipe
  recipe: {
    id: 1,
    name: 'Banga Soup',
    description: 'This recipe is very popular in the ' +
    'south south part of Nigeria',
    ingredients: 'palm kernel, assorted meat, maggi, palm oil',
    directions: 'pour palm oil in pot, blanch oil for 10mins',
    imageUrl: 'dist/image1',
    userId: 1
  },

  recipeArray: [
    {
      id: 1,
      name: 'Banga Soup',
      description: 'This recipe is very popular in the ' +
      'south south part of Nigeria',
      ingredients: 'palm kernel, assorted meat, maggi, palm oil',
      directions: 'pour palm oil in pot, blanch oil for 10mins',
      imageUrl: 'assets/images/pizza1.jpg',
      userId: 1
    }
  ],

  updateRecipe: {
    name: 'Banga Soup',
    description: 'This recipe is very popular in the ' +
    'south south part of Nigeria',
    ingredients: 'palm kernel, assorted meat, maggi, palm oil',
    directions: 'pour palm oil in pot, blanch oil for 10mins',
    imageUrl: 'assets/images/pizza1.jpg'
  },

  // review
  review: {
    id: 1,
    message: 'Lovely meal',
    recipeId: 1,
    userId: 1,
    createdAt: '2019-01-12 00:00'
  },

  // category
  category: {
    id: 1,
    name: 'Local Dish',
    userId: 1
  },

  // favorite
  favorite: {
    id: 1,
    recipeId: 1,
    userId: 1
  },
};
