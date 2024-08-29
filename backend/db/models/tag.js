'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsTo(models.User, { foreignKey: 'userId' });
      Tag.belongsToMany(models.Note, {
        through: 'NoteTag',
        foreignKey: 'tagId',
        otherKey: 'noteId',
        as: 'Notes'
      });
    }
  }
  Tag.init({
    userId: {
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
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};