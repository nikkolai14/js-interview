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

(async () => {
  await sequelize.sync();
})();

module.exports = User;
