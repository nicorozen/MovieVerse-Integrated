const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const List = sequelize.define('List', {
        listId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
    
    return List;
}