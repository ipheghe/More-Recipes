module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeDesc: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    directions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
    },
    views: {
      type: DataTypes.INTEGER,
    },
    upvotes: {
      type: DataTypes.INTEGER,
    },
    downvotes: {
      type: DataTypes.INTEGER,
    },
    notification: {
      type: DataTypes.INTEGER,
    },
    postedBy: {
      type: DataTypes.INTEGER
    },
  }, 

  {
    associate: (models) => {
      // associations can be defined here
      Recipe.belongsTo(models.User, {
        foreignKey: 'id',
        as: 'postedBy',
      });
    }
  });

  return Recipe;
};
