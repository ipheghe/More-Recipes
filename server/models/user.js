module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        min: 4     
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
          isAlpha: true,
          max: 50
        }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
          isAlpha: true,
          max: 50
        }
    },
    mobileNumber: {
      type: DataTypes.BIGINT,
      validate: {
        len: {
          args: [11,13],
          msg: 'Invalid number digits'
        }
      }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }

    },

  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'recipes',
    });

    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
      as: 'favorites',
    });

    User.hasMany(models.Category, {
      foreignKey: 'userId',
      as: 'categories',
    });

    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });

  };


  return User;
};
