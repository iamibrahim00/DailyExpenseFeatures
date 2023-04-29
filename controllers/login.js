const e = require('express');
const User = require('../models/User');
const { Error } = require('sequelize');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


function generateToken(id){
    return jwt.sign({userId:id },'987654321')
}
exports.login = async (req,res,next) =>{
     try{
            let email = req.body.email
            const emailExists = await User.findOne({ 
                where: { email: email } 
            });
            let password = req.body.password
            const passwordExists = await User.findOne({ 
                where: { password: password } 
            });
            const user = await User.findAll({where : {email}})
            if(user.length >0){
                bcrypt.compare(password,emailExists.password,(err,result)=>{
                    if(err){
                        throw new Error('something went wrong')
                    }
                    
                    if(result === true){
                        return res.status(200).json({
                            data:[],
                            success:true,
                            msg:"Successfully Logged in",
                            token:generateToken(user[0].id)
                        })
                    }
                    else{
                        return res.status(400).json({
                            data:[],
                            success:false,
                            msg:"Password Incorrect"
                        })
                    }
                })
            }
               else if(!emailExists){
                return res.status(404).json({
                    data:[],
                    success:false,
                    msg:"Email-Id doesn't exists"
                })
               }      
               else{
                return res.status(404).json({
                    data:[],
                    success:false,
                    msg:"User doesn't exists"
                })
               }
                      
     }catch(err){
        res.status(500).json({
        error : err
        })

    }
}



