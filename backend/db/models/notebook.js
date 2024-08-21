'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notebook.belongsTo(models.User, { foreignKey: 'ownerId', as: "Owner"});
      Notebook.hasMany(models.Note, { foreignKey: 'notebookId', onDelete: "CASCADE", hooks: true });
    }
  }
  Notebook.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Notebook',
  });
  return Notebook;
};