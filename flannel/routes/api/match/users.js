const express = require('express');
const users = express.Router();
const client = require('../../../db');

users.post('/createUserInfo', createUserInfo);
users.post('/updateUserInfo', updateUserInfo);

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