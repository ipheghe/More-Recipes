module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    message: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  });

  Review.associate = (models) => {
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Review.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
      });

  };

  return Review;
};