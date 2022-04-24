const { 
    Sequelize, 
    Model, 
    DataTypes 
} = require('sequelize');
const User = require('./user');
const sequelize = new Sequelize('sqlite::memory:');
const Data = sequelize.define('data', {
  randAlphabet: DataTypes.STRING(1)
});

Data.belongsTo(User);

(async () => {
  await sequelize.sync();
})();

module.exports = Data;
