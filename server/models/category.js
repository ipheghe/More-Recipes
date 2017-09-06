export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
  Category.associate = (models) => {

    Category.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Category.hasMany(models.Favorite, {
      foreignKey: 'categoryId',
      as: 'favorites',
    });

  };
  return Category;
};