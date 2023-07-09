'use strict';
const { Model } = require ('sequelize');
const evolution = require('pg');

module.exports = (sequelize,DataType) => {
    class Evolution extends Model {
        static associate({ pokemon }) {
            Evolution .hasMany(pokemon, {
                foreignKey: 'evolution_id',
                as:'elements'
            })
        }
    }
    Evolution.init({
        evolution_id: {
            type: DataType.string,
            primaryKey: true,
            autoIncrement: true
        },
        element_id: {
            type: DataType.string,
            allowNull: false
        }
        }, {
            sequelize, 
            modelName: 'evolution',
            tableName: 'evolution_id',
            timestamps:false
    });
    return Evolution;
}