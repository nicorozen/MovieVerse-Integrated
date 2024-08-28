const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ListItem = sequelize.define('ListItem', {
        listItemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        movieId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contentType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return ListItem;
}