const { Model } = require('sequelize');

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
    }
})
}