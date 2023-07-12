'use strict';
//const { Model } = require('sequelize');
const pokemon = require('pg');
const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize(process.env.PG_URI);

module.exports = (sequelize, DataTypes) => {
    class Pokemon extends Model {
        static associate({elements}){
            Pokemon.hasMany(elements, {
                foreignKey: 'pokemon_id',
                as:'Pokemon'
            })
    }
}

Pokemon.init({
    pokemon_id: {
        type :DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement :true
    },
    height: {
        type: DataTypes.string,
        allowNull: true,
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: true
    },
    evolution_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weakness: {
        type: DataTypes.STRING,
        allowNull: true
    },
    recommendation: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "Pokemon",
    tableName:"pokemons",
    timestamps:false
});
return Pokemon;
}