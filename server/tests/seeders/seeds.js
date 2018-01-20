import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.load();

const salt = bcrypt.genSaltSync(10);
const password = 'abcde';

export const generateToken = id => jwt.sign(
  { user: { id, username: 'justin' } },
  process.env.TOKEN_SECRET, { expiresIn: 24 * 60 * 60 }
).toString();

export const invalidToken = jwt.sign(
  { user: { id: 120, username: 'justin' } },
  'jsjsjjj', { expiresIn: '10s' }
).toString();

export const expiredToken = jwt.sign(
  { user: { id: 120, username: 'justin' } },
  process.env.TOKEN_SECRET, { expiresIn: '0.5s' }
).toString();


export const seedUsers = {
  registered: [
    {
      id: 101,
      username: 'pnator',
      password: bcrypt.hashSync(password, salt, null),
      fullName: 'Emeka Amadi',
      mobileNumber: 2348023451234,
      email: 'iphegheovie@yahoo.com',
      resetPasswordToken: '7a3ffadc0ed4379657e4050a254fc486475c783b699' +
      '16de087135d68070fe0b894a8a735d523054b28b86763f33293f7',
      resetPasswordExpires: 15160090000
    },
    {
      id: 102,
      username: 'okon',
      password: bcrypt.hashSync(password, salt, null),
      fullName: 'Akpan Etim',
      mobileNumber: 2348032121234,
      email: 'liiov2004@yahoo.com',
      resetPasswordToken: '87a3ffadc0ed4379657e4050a254fc486475c783b699' +
      '16de087135d68070fe0b894a8a735d523054b28b86763f33293f7',
      resetPasswordExpires: 3516009239927
    },
    {
      id: 103,
      username: 'aaron',
      password: bcrypt.hashSync(password, salt, null),
      fullName: 'Akpan Joshua',
      mobileNumber: 2348032121234,
      email: 'okonyahoo.com',
    }
  ],

  unregistered: [
    {
      id: 550,
      username: 'user21',
      password: 'user21password',
      fullName: 'Akpan Etim',
      mobileNumber: 2348032121234,
      email: 'user11@example.com'
    },
    {
      username: 'user22',
      password: 'user22password',
      email: 'user22@example.com'
    }
  ]
};

export const seedRecipes = [
  {
    id: 101,
    name: 'Banga Soup',
    description: 'This recipe is very popular in the south south part of Nigeria',
    ingredients: 'palm kernel, assorted meat, maggi, palm oil',
    directions: 'pour palm oil in pot, blanch oil for 10mins',
    imageUrl: 'dist/image1',
    userId: 101
  },
  {
    id: 102,
    name: 'Jollof Rice',
    description: 'This recipe is very popular and enjoyed by all',
    ingredients: 'rice, onions, fresh tomatoes, assorted meat, maggi, turkey',
    directions: 'parboil rice for 15mins, prepare stew in a separte pot',
    imageUrl: 'dist/image2',
    userId: 102
  },
  {
    id: 103,
    name: 'Pepper Soup',
    description: 'This recipe is very popular in the south south part of Nigeria',
    ingredients: 'palm kernel, assorted meat, maggi, palm oil',
    directions: 'pour palm oil in pot, blanch oil for 10mins',
    imageUrl: 'dist/image1',
    userId: 101
  },
  {
    id: 104,
    name: 'Fried Rice',
    description: 'This recipe is very popular and enjoyed by all',
    ingredients: 'rice, onions, fresh tomatoes, assorted meat, maggi, turkey',
    directions: 'parboil rice for 15mins, prepare stew in a separte pot',
    imageUrl: 'dist/image2',
    userId: 102
  },
];

export const seedCategories = [
  {
    id: 101,
    name: 'Local Dish',
    userId: 101
  },
  {
    id: 102,
    name: 'Foreign Dish',
    userId: 102
  },
];

export const seedFavorites = [
  {
    id: 101,
    recipeId: 101,
    categoryId: 101,
    userId: 101
  },
  {
    id: 102,
    recipeId: 102,
    categoryId: 102,
    userId: 102
  },
];

export const tokens = [
  generateToken(seedUsers.registered[0].id),
  generateToken(seedUsers.registered[1].id),
  generateToken(seedUsers.registered[2].id),
  generateToken(seedUsers.unregistered[0].id),
  generateToken('stringToken'),
];
