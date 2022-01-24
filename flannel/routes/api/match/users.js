const express = require('express');
const users = express.Router();
const client = require('../../../db');
let authenticate = require('../authenticate.js');

users.post('/createUserInfo', createUserInfo);
users.post('/updateUserInfo', updateUserInfo);

users.get('/', authenticate, function(req, res, next) {
    let users = client.db('flannel').collection('users');
    users.find().toArray((err, data) => {
        //get a list of all the users 
        res.status(200).send(data);//.send(data)
    })
})

function createUserInfo(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('createUserInfo');
}
function updateUserInfo(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('updateUserInfo');
}

module.exports = users;