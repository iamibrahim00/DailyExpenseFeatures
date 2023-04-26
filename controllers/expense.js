const Expense = require('../models/Expense')

exports.postExpense = async (req,res,next) =>{
 
    try{
    const money = req.body.money;
    console.log(money)
    const description = req.body.description;
    const category = req.body.category;
    const data = await Expense.create({money :money,description : description,
         category: category});
    res.status(201).json({newExpenseDetails : data})
    }catch(err){
        res.status(500).json({
        error : err
        })
        
    }
}

exports.getExpense = async(req,res,next)=>{
    try{
        const expense = await Expense.findAll();
        res.status(200).json({allExpense : expense})
    }catch(err){
        console.log(err)
    }
   
}
exports.deleteExpense = async(req,res,next)=>{
    try{
        const expenseId= req.params.id
        await Expense.destroy({where : {id : expenseId}});
        res.status(200).json({success : true})
    }catch(err){
        console.log(err)
    }
   
}