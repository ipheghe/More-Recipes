module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    recipeId: {
      type: DataTypes.INTEGER
    },
    commentby: {
      type: DataTypes.INTEGER
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
        foreignKey: 'id',
        as: 'commentby',
        onDelete: 'CASCADE',
      });
    }
  });

  return Comment;
};