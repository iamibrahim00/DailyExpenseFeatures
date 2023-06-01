const User = require('../models/User');
const Expense = require('../models/Expense');
const sequelize = require('../util/database');
const e = require('express');

const getUserLeaderBoard = async (req, res) => {
    try{
        const leaderboardofusers = await User.findAll({
            
            attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.money')),'total_cost']],
            
            include: [
                {
                    model : Expense,
                    attributes : []
            }
               
            ],
            group :['user.id'],
            order:[[sequelize.col('total_cost'),'DESC']]
        })
        const expenses = await Expense.findAll({
            attributes: ['userId',[sequelize.fn('sum',sequelize.col('expense.money')),'total_cost']],
            group :['userId']
        })

         //const userAggregatedExpenses = {} 
        // expenses.forEach((expense) => {           
        //     if(userAggregatedExpenses[expense.userId]>0){
        //         userAggregatedExpenses[expense.userId] =userAggregatedExpenses[expense.userId] + parseInt(expense.money)
        //     }
        //     else {
        //         userAggregatedExpenses[expense.userId] = parseInt(expense.money)
        //     }          
        // });

    //     var userleaderboarddetails = []
    //     users.forEach((user)=>{
    //         userleaderboarddetails.push({name:user.name, total_cost:userAggregatedExpenses[user.id] || 0})
    //     })
    //     console.log(userleaderboarddetails)
    //    userleaderboarddetails.sort((a,b)=>b.total_cost - a.total_cost)
        res.status(200).json(expenses)
    
} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}

module.exports = {
    getUserLeaderBoard
}