const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ListType = sequelize.define('ListType', {
        listTypeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    return ListType;
}