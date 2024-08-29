'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.User, { foreignKey: 'ownerId', as: "Owner"});
      Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
      Note.belongsToMany(models.Tag, {
        through: 'NoteTag',
        foreignKey: 'noteId',
        otherKey: 'tagId',
        as: 'Tags'
      });      
    }
  }
  Note.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    notebookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Notebooks",
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};