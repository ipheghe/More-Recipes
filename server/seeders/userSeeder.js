const testValidUsers = [
  {
    username: 'pnator',
    password: 'abcde',
    firstName: 'Emeka',
    lastName: 'Amadi',
    mobileNumber: 2348023451234,
    email: 'emeka@yahoo.com',
  },
  {
    username: 'okon',
    password: 'abcde',
    firstName: 'Akpan',
    lastName: 'Okon',
    mobileNumber: 2348032121234,
    email: 'okon@yahoo.com',
  },
  {
    username: 'okon',
    password: 'abcde',
    firstName: 'Akpan',
    lastName: 'Okon',
    mobileNumber: 2348032121234,
    email: 'okonyahoo.com',
  },
  {
    username: '1pn ator',
    password: 'abcde',
    firstName: 'Emeka',
    lastName: 'Amadi',
    mobileNumber: 2348023451234,
    email: 'amadi@yahoo.com',
  },
  {
    username: 'vixen',
    password: 'bear',
    firstName: 'Vicky',
    lastName: 'Ola',
    mobileNumber: 2348032125434,
    email: 'vicky@yahoo.com',
  },
  {
    username: 'mandy',
    password: 'bear',
    firstName: 'Mandy',
    lastName: 'Ola',
    mobileNumber: 2348032125434,
    email: 'mandy@yahoo.com',
  },
  {

  }
];

const validUsersLogin = [
  {
    username: 'pnator',
    password: 'abcde',
  },
  {
    username: 'okon',
    password: 'abcde',
  },
  {
    username: 'vixen',
    password: 'bear',
  },
  {
    username: 'mandy',
    password: 'bear',
  },
];

const invalidUsers = [
  {
    username: 'kenedyy',
    password: 'abcde',
  },

  {
    username: '',
    password: 'abcde',
  },
];

const incorrectPassword = [
  {
    username: 'pnator',
    password: 'incorrect',
  },
  {
    username: 'okon',
    password: '',
  },
];

const nullForm = [
  {
    username: 'sponge'
  }
];


export default {
  validUsersLogin,
  invalidUsers,
  testValidUsers,
  incorrectPassword,
  nullForm,
};
