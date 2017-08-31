const Sequelize = require('sequelize');
require('sequelize-isunique-validator')(Sequelize);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,

    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    mobile: {
      type: DataTypes.BIGINT,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

    },
  }); 

  return User;
};
