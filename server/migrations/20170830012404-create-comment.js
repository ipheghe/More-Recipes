module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Comments', {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recipes',
          key: 'recipeId',
          as: 'recipeId',
        },
      },
      commentBy: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username',
          as: 'commentBy',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
    down: queryInterface /* Sequelize */ =>
    queryInterface.dropTable('Comments'),
};