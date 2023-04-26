const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const User =require('./models/User')
const bcrypt = require('bcrypt')
const Expense =require('./models/Expense')
const sequelize = require('./util/database');

var cors = require('cors')
var jsonParser = bodyParser.json()

const app = express();
app.use(cors())  


const userRoutes = require('./routes/dailyExpense')
const loginRoutes = require('./routes/login')
const ExpenseRoutes = require('./routes/expense')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(jsonParser)

app.use(userRoutes)
app.use(loginRoutes)
app.use(ExpenseRoutes)



sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
