'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Elements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Elements.init({
    element_id: DataTypes.STRING,
    name: DataTypes.STRING,
    evolution_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Elements',
  });
  return Elements;
};