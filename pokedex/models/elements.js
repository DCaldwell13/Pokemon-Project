'use strict'; 
const { Model } = require('sequelize');
const element = require('pg');

module.exports = (sequelize, DataTypes) => {
    class Element extends Model {
       static associate({ Evolution, Pokemon }) {
           Element.belongsToMany(Pokemon, {
              foreignKey: 'element_id',
              as: 'elements'
           })
           Element.hasMany(Evolutions, {
            foreignKey: 'evolution_id',
            as: 'evolution_type'
           })
       }
    }
    Element.init({
        element_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        evolution_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Element',
        tableName:'elements',
        timestamps: false
    });
    return Element;
 }