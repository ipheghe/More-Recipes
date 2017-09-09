export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists',
      },
      validate: {
        min: {
          args: [4],
          msg: `Username must have at least 4 characters.`
        },
        max: {
          args: [30],
          msg: `Username characters cannot be more than 30`
        },
        is: {
          args: /^[A-Za-z][A-Za-z0-9-]+$/i,
          msg: `Username must start with a letter and have no spaces.`
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        min: {
          args: [4],
          msg: 'Password must have at least 4 characters'
        },
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
      unique: {
        args: true,
        msg: `Email Already exists!`,
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid Email',
        },
        max: {
          args: 200,
          msg: 'The email you entered is invalid or longer than 250 characters.'
        }
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

    User.hasMany(models.Vote, {
      foreignKey: 'userId',
      as: 'votes',
    });

  };


  return User;
};
