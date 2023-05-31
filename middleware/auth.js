const { json } = require('body-parser')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


const authenticate = (req,res,next)=>{
    try{ 
        const token = req.header('Authorization')
        const user = jwt.verify(token,'987654321')
        
        User.findByPk(user.userId).then(user=>{     
            req.user = user                  
            next()
        })
        
    }catch(err){
        console.log(err)
        return res.status(401).json({success:false})
    }
    
}


module.exports = {
    authenticate
}