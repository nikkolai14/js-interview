const { 
    Sequelize, 
    Model, 
    DataTypes 
} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('user', {
  username: DataTypes.STRING,
  password: DataTypes.STRING
});

module.exports = User;
