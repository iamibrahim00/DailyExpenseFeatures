const e = require('express');
const User = require('../models/User');
const { Error } = require('sequelize');
const bcrypt = require('bcrypt')

exports.postDailyExpense = async (req,res,next) =>{
     try{
         var email = await User.findOne({
            where:{
                email:req.body.email
            }
        })
          
            if(email){
                return res.status(500).json({
                    data:[],
                    success:false,
                    msg:"email exist"
                })
            }
            else{
                const saltrounds = 10
                const name = req.body.name;
                console.log(name)
                const email = req.body.email;
                const password = req.body.password;

                bcrypt.hash(password,saltrounds,async(err,hash)=>{
                    const data = await User.create({
                        name :name,
                        email : email,
                        password: hash});
                        res.status(200).json({message:"Successfully created new user"})
                })
            
               }

     }catch(err){
        res.status(500).json({
        error : err
        })

    }
} 


