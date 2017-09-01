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
      validate: {
          isAlpha: true
        }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
          isAlpha: true
        }
    },
    mobile: {
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

    }
 },
  {
    associate: (models) => {
      // associations can be defined here
      User.hasMany(models.Recipe, {
        foreignKey: 'recipeId',
        as: 'recipesAdded',
      });
    }

  });

  return User;
};
