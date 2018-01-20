const testValidUsers = [
  {
    username: 'pnator',
    password: 'abcde',
    fullName: 'Emeka Amadi',
    mobileNumber: 2348023451234,
    email: 'iphegheovie@yahoo.com',
  },
  {
    username: 'okon',
    password: 'abcde',
    fullName: 'Akpan Etim',
    mobileNumber: 2348032121234,
    email: 'liiov2004@yahoo.com',
  },
  {
    username: 'okon',
    password: 'abcde',
    fullName: 'Akpan Joshua',
    mobileNumber: 2348032121234,
    email: 'okonyahoo.com',
  },
  {
    username: '1pn ator',
    password: 'abcde',
    fullName: 'Emeka Nwabuzorr',
    mobileNumber: 2348023451234,
    email: 'amadi@yahoo.com',
  },
  {
    username: 'vixen',
    password: 'bear',
    fullName: 'Vicky Emmanuel',
    mobileNumber: 2348032125434,
    email: 'vicky@yahoo.com',
  },
  {
    username: 'mandy',
    password: 'bear',
    fullName: 'Mandy Bear',
    mobileNumber: 2348032125434,
    email: 'mandy@yahoo.com',
  },
  {

  }
];

const testInvalidUsers = [
  {
    username: '',
    password: 'abcde',
    fullName: 'Emeka Amadi',
    mobileNumber: 2348023451234,
    email: 'iphegheovie@yahoo.com',
  },
  {
    username: 'test1',
    password: '',
    fullName: 'Akpan Etim',
    mobileNumber: 2348032121234,
    email: 'liiov2004@yahoo.com',
  },
  {
    username: 'test1',
    password: 'abcde',
    fullName: '',
    mobileNumber: 2348032121234,
    email: 'okonyahoo.com',
  },
  {
    username: 'test1',
    password: 'abcde',
    fullName: 'Emeka Nwabuzorr',
    mobileNumber: '',
    email: 'amadi@yahoo.com',
  },
  {
    username: 'test1',
    password: 'bear',
    fullName: 'Vicky Emmanuel',
    mobileNumber: 2348032125434,
    email: '',
  },
  {
    username: 'te',
    password: 'bear',
    fullName: 'Mandy Bear',
    mobileNumber: 2348032125434,
    email: 'mandy@yahoo.com',
  },
  {
    username: 'test1',
    password: 'ok',
    fullName: 'Mandy Bear',
    mobileNumber: 2348032125434,
    email: 'mandy@yahoo.com',
  },
  {
    username: 'test1',
    password: 'abcde',
    fullName: 'Ma',
    mobileNumber: 2348032125434,
    email: 'mandy@yahoo.com',
  },
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
  testInvalidUsers,
  invalidUsers,
  testValidUsers,
  incorrectPassword,
  nullForm,
};
