const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const User =require('./models/User')
const bcrypt = require('bcrypt')
const Expense =require('./models/Expense')
const sequelize = require('./util/database');
const dotenv = require("dotenv")

var cors = require('cors')
var jsonParser = bodyParser.json()

const app = express();
app.use(cors())  


const userRoutes = require('./routes/dailyExpense')
const loginRoutes = require('./routes/login')
const ExpenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purcahse')
const premiumRoutes = require('./routes/premiumFeature')
const forgetPassword = require('./routes/forgetPassword')
const Order = require('./models/Order');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(jsonParser)

app.use(userRoutes)
app.use(loginRoutes)
app.use(ExpenseRoutes)
app.use(purchaseRoutes) 
app.use(premiumRoutes)
app.use(forgetPassword)

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
