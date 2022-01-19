var express = require('express');
var path = require('path');

const port = 3000;
var app = express();

var indexRouter = require('./routes/index');

app.use(express.json());
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(port, () => {
    console.log("server is running!");
})