export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    views: {
      type: DataTypes.INTEGER,
      defaultValue:0,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue:0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue:0,
    },
  });

  Vote.associate = (models) => {
      Vote.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Vote.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
      });

  };

  return Vote;
};