module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
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
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }); 

  return User;
};
