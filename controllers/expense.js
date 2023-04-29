const Expense = require('../models/Expense')
const jwt = require('jsonwebtoken');

exports.postExpense = async (req,res,next) =>{
 
    try{

    const money = req.body.money;
    const description = req.body.description;
    const category = req.body.category;
    
    const token = req.body.postToken
    const user = jwt.verify(token,'987654321')
    const id = user.userId

    const data = await Expense.create({money :money,
        description : description,
         category: category,
         userId : id
    
        });
    res.status(201).json({newExpenseDetails : data})
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