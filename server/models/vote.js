export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    option: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
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
