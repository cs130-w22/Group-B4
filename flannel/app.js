const express = require('express');
const path = require('path');
let client = require('./db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const port = 3000;
const app = express();

const indexRouter = require('./routes/index');
let loginRouter = require('./routes/api/login');
const userRouter = require('./routes/api/match/users');
const labelRouter = require('./routes/api/match/labels');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/label', labelRouter);
app.use(express.static(path.join(__dirname, 'public')));



var server = app.listen(port, () => {
    console.log("server is running!");
})

client.connect(`mongodb+srv://flannel:${process.env.DATABASE_PWD}@cluster0.elmnm.mongodb.net/flannel?retryWrites=true&w=majority`, (err) => {
  if(err)
  {
    console.log("error connecting to db");
    process.exit(1);
  }
  else 
  {
    console.log("connected to database");
  }
})
