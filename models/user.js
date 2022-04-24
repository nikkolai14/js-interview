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

User.prototype.validatePassword = function(password) {
 return new Promise(resolve => {
    bcrypt.compare(password, this.password).then(function(result) {
        resolve(result);
    });
 });
};

(async () => {
  await sequelize.sync();
})();

module.exports = User;
