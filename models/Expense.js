const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Expense = sequelize.define('expense', {
  expenseid : {
    type : Sequelize.INTEGER,
    allowNull : false,
    autoIncrement : true,
    primaryKey : true
  },
  money : Sequelize.STRING,
  description : Sequelize.STRING,
  category : Sequelize.STRING,

}); 

module.exports = Expense; 