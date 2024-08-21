'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoteTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NoteTag.init({
    noteId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Notes",
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    tagId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tags",
        key: 'id'
      },
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'NoteTag',
  });
  return NoteTag;
};