const nodemailer = require('nodemailer');

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
    text: "Testing our first sender"
}

mailTransporter.sendMail(details,(err)=>{
    if(err){
        console.log("it has an error",err)
    }
    else{
        console.log("email has sent")
    }
})

