const nodemailer = require('nodemailer');

const forgetPassword = async(req,res)=>{

    const email = req.body.email
    let mailTransporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: "ibrahimtestdemo@gmail.com",
            pass: "prwwjjbxszolxgnh"
        }
    })
    let details ={
        from :"ibrahimtestdemo@gmail.com",
        to :"iyamibrahimshaikh@gmail.com",
        subject: "testing our nodemailer",
        text: `this is ${email}`
    }
    
    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log("it has an error",err)
        }
        else{
            console.log("email has sent")
        }
    })
} 

module.exports={
    forgetPassword
}
// const forget = async(req,res)=>{
//     const email = req.body.email
//     console.log("wow=>",email)
//     res.status(200).json({message:"hello forget"})
// }

