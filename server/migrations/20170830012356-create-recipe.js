module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recipes', {
      recipeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      recipeDesc: {
        type: Sequelize.STRING
      },
      ingredients: {
        allowNull: false,
        type: Sequelize.STRING
      },
      directions: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB
      },
      views: {
        type: Sequelize.INTEGER
      },
      upvotes: {
        type: Sequelize.INTEGER
      },
      downvotes: {
        type: Sequelize.INTEGER
      },
      notification: {
        type: Sequelize.INTEGER
      },
      postedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'postedBy',
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
    queryInterface.dropTable('Recipes'),
};