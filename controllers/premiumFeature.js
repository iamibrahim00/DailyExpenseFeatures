const User = require('../models/User');
const Expense = require('../models/Expense');
const sequelize = require('../util/database');
const e = require('express');

const getUserLeaderBoard = async (req, res) => {
    try{
        const users = await User.findAll({
            
            attributes:['id',
            'name',
            [sequelize.fn('sum',sequelize.col('expenses.money')),'total_cost']
        ],
            
            include: [
                {
                    model : Expense,
                    attributes : []
            }
               
            ],
            group :['id'],
            order:[
                ['total_cost','DESC']
            ],
            raw: true
         })
        const expenses = await Expense.findAll({
            attributes: ['userId',[sequelize.fn('sum',sequelize.col('expense.money')),'total_cost']],
            group :['userId']
        })
        res.status(200).json(users)
    
} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}

module.exports = {
    getUserLeaderBoard
}