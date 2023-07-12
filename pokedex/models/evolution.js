'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evolution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Evolution.init({
    element_id: DataTypes.STRING,
    name: DataTypes.STRING,
    evolution_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evolution',
  });
  return Evolution;
};