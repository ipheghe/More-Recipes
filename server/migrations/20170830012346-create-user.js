module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          min: 4,
        },
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAlpha: true,
          max: 50
        }
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAlpha: true,
          max: 50
        }
      },
      mobileNumber: {
        type: Sequelize.BIGINT
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      resetPasswordToken: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      resetPasswordExpires: {
        type: Sequelize.BIGINT,
        defaultValue: 0
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
    queryInterface.dropTable('Users'),
};
