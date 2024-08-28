const {
    Sequelize
} = require('sequelize');
const UserModel = require('./models/users');
const ListModel = require('./models/lists');
const ListItemModel = require('./models/listItems');
const ListTypeModel = require('./models/listType');

const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWORD, {
    host: 'roundhouse.proxy.rlwy.net',
    dialect: 'mysql',
    port: '54757'
});

const User = UserModel(sequelize, Sequelize);
const List = ListModel(sequelize, Sequelize);
const ListItem = ListItemModel(sequelize, Sequelize);
const ListType = ListTypeModel(sequelize, Sequelize);


User.hasMany(List, { foreignKey: 'userId' });
List.belongsTo(User, { foreignKey: 'userId' });

ListType.hasMany(List, { foreignKey: 'listTypeId' });
List.belongsTo(ListType, { foreignKey: 'listTypeId' });

List.hasMany(ListItem, { foreignKey: 'listId' });
ListItem.belongsTo(List, { foreignKey: 'listId' });

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.log('Error: ', err);
    });

module.exports = {
    sequelize,
    User,
    List,
    ListItem,
    ListType
};