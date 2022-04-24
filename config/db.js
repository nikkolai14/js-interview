const { Sequelize } = require('sequelize');

const connectDB = async() => {
    try{
        const sequelize = await new Sequelize('sqlite::memory:');
    } catch(err){
        console.error(err.message);
    }
}

module.exports = connectDB;
