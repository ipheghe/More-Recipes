module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING
    },
    recipeId: {
      type: DataTypes.INTEGER
    },
    commentby: {
      type: DataTypes.STRING
    },
  },
  {
    associate: (models) => {
      // associations can be defined here
      Comment.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
        as: 'recipeId',
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'username',
        as: 'commentby',
        onDelete: 'CASCADE',
      });
    }
  });

  return Comment;
};