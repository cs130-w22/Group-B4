const express = require('express');
const users = express.Router();
const client = require('../../../db');
let authenticate = require('../auth/authenticate.js');
let ObjectID = require('mongodb').ObjectID;

users.post('/createUserInfo', authenticate, createUserInfo);
users.post('/updateUserInfo', authenticate, updateUserInfo);
users.post('/findUsersByTag', authenticate, findUsersByTag);
users.get('/getUserProfile', authenticate, getUserProfile);

users.get('/', authenticate, function(req, res, next) {
    let users = client.db('flannel').collection('users');
    users.find().toArray((err, data) => {
        //get a list of all the users 
        let tmp_data = [];
        data.forEach((item) => {
            console.log(item.username, req.query.username)
            if(item.username !== req.query.username) {
                tmp_data.push(item)
            }
        })
        res.status(200).send(tmp_data);//.send(data)
    })
})

function getUserProfile(req, res) {
    let userId = req.query.ID; //get the userID 
    let users = client.db('flannel').collection('users');
    users.find({"_id" : new ObjectID(userId)}).toArray(function (err, document) {
        if(err) res.status(500).send(); //internal error
        delete document[0].password;
        res.status(200).send(document[0]); //send the entire user minus the pswd 
    })
}

//return a list of all users who have some sort of similar interest
function findUsersByTag(req, res) {
    let interests = req.body.interests;
    let users = client.db('flannel').collection('users');
    users.aggregate(
        [{"$unwind": "$interests"}, {"$match" : {"$expr": {"$in": ["$interests", interests]}}}]
    ).toArray(function(err, docs) {
        console.log(docs);
        res.status(200).send(docs)
    })

}
function createUserInfo(req, res) {
    let interests = req.body.interests;
    let users = client.db('flannel').collection('users');
    users.findOneAndUpdate(
        {'username': req.body.username},
        {$set: {"interests": interests}},
        function(err, doc) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send('createUserInfo');

            if(err) {
                res.status(400).send()
            }
        }
    )
    
}
function updateUserInfo(req, res) {
    let interests = req.body.interests;
    let users = client.db('flannel').collection('users');
    users.findOneAndUpdate(
        {'username': req.body.username},
        {$set: {"interests": interests}},
        function(err, doc) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send('createUserInfo');

            if(err) {
                res.status(400).send()
            }
        }
    )

}

module.exports = users;