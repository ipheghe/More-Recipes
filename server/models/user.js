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
        len: {
          args: [4, 30],
          msg: 'Username characters must be minimum 4 and maximum 30'
        },
        is: {
          args: /^[A-Za-z][A-Za-z0-9-]+$/i,
          msg: 'Username must start with a letter and have no spaces.'
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [4],
          msg: 'Password must have at least 4 characters'
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: 'first name  must contain only alphabets'
        },
        len: {
          args: [4, 30],
          msg: 'first name characters must be minimum 4 and maximum 30'
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: 'last name  must contain only alphabets'
        },
        len: {
          args: [4, 30],
          msg: 'last name characters must be minimum 4 and maximum 30'
        },
      }
    },
    mobileNumber: {
      type: DataTypes.BIGINT,
      validate: {
        len: {
          args: [11, 13],
          msg: 'Invalid number digits'
        }
      }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email Already exists!',
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
    resetPasswordToken: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    resetPasswordExpires: {
      type: DataTypes.BIGINT,
      defaultValue: 0
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
