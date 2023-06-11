const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const User = sequelize.define('user', {
  id : {
    type : Sequelize.INTEGER,
    allowNull : false,
    autoIncrement : true,
    primaryKey : true
  },
  name : Sequelize.STRING,
  email : {
    type : Sequelize.STRING,
    allowNull:false,
    unique : true,
   
  }, 
  password : Sequelize.STRING,
  ispremiumuser : Sequelize.BOOLEAN,
  totalExpenses :{
    type : Sequelize.INTEGER,
    allowNull:false,
    defaultValue : "0"
  }

});

module.exports = User; 