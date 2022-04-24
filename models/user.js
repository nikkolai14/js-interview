import { 
    Sequelize, 
    Model, 
    DataTypes 
} from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING
});

module.exportrs = User;
