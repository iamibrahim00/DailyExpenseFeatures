const Expense = require('../models/Expense')
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sequelize = require('../util/database');

const postExpense =  async (req,res,next) =>{
    const t = await sequelize.transaction()
    try{

    const { money, description, category } = req.body;
    
    const token = req.body.postToken
    const user = jwt.verify(token,'987654321')
    const userId = user.userId

    

    const expense = await Expense.create({ money, description, category, userId:user.userId},{transaction:t})
        const totalExpense = Number(req.user.totalExpenses) + Number(money)
        console.log(totalExpense)
        await User.update({
            totalExpenses : totalExpense
        },{
            where: {id:user.userId},
            transaction :t
        })
            await t.commit()
            return res.status(201).json({expense, success: true } );
        
    }catch(err){
        await t.rollback()
       console.log(err)
        
        
    }
}

const getExpense = async(req,res,next)=>{
    try{
        const expense = await Expense.findAll({where:{userId: req.user.id}});
        res.status(200).json({allExpense : expense,success:true})
    }catch(err){
        console.log(err)
    }
   
}
const deleteExpense = async(req,res,next)=>{
    const t = await sequelize.transaction()
    try{ 
        const deleteexpense = await Expense.findByPk(req.params.expenseid)
        const deletetoken = req.params.expenseid    

        const destroyMoney = deleteexpense.money     
        const totalExpense1 = Number(req.user.totalExpenses) - Number(destroyMoney)
        await Expense.destroy({
            where : {expenseid:deletetoken ,userId: req.user.id}},{transaction :t}
            );
        await User.update({
                totalExpenses : totalExpense1
            },{
                where: {id:req.user.id},
                transaction :t
            })
        await t.commit()
        res.status(200).json({success : true})
    }catch(err){
        await t.rollback()
        console.log(err)
    }
   
}
module.exports={
    postExpense,
    getExpense,
    deleteExpense
}