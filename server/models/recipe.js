module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeDescription: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    notification: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

  });

    Recipe.associate = (models) =>  {

            // associations can be defined here
      Recipe.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });

      Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews',
    });
      Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      as: 'favorites',
    });


    };
  return Recipe;
};
