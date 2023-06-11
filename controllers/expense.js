const Expense = require('../models/Expense')
const jwt = require('jsonwebtoken');
const User = require('../models/User')

exports.postExpense =  async (req,res,next) =>{
 
    try{

    const { money, description, category } = req.body;
    
    const token = req.body.postToken
    const user = jwt.verify(token,'987654321')
    const userId = user.userId


    Expense.create({ money, description, category, userId:user.userId}).then(expense => {
            const totalExpense = Number(req.user.totalExpenses) + Number(money)
        console.log(totalExpense)
        User.update({
            totalExpenses : totalExpense
        },{
            where: {id:user.userId}
        }).then(async()=>{
            return res.status(201).json({expense, success: true } );
        })
        
    })
    
   
    }catch(err){
       console.log(err)
        
        
    }
}

exports.getExpense = async(req,res,next)=>{
    try{
        console.log('this is=>',req.user.id)
        const expense = await Expense.findAll({where:{userId: req.user.id}});
        res.status(200).json({allExpense : expense,success:true})
    }catch(err){
        console.log(err)
    }
   
}
exports.deleteExpense = async(req,res,next)=>{
    try{
        //const expenseId= req.params.id
        const deletetoken = req.user.id
        console.log(deletetoken)
        await Expense.destroy({where : {userId:deletetoken}});
        res.status(200).json({success : true})
    }catch(err){
        console.log(err)
    }
   
}