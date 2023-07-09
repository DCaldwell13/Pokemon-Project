const { Model } = require ('sequelize');

module.exports = (sequelize,DataType) => {
    class Evolution extends Model {
        static associate({ pokemon }) {
            
        }
    }
}