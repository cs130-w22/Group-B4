const express = require('express')
const users = express.Router()
const client = require('../../../db')
let authenticate = require('../auth/authenticate.js')
let ObjectID = require('mongodb').ObjectID


users.post('/createUserInfo', authenticate, createUserInfo)
users.post('/updateUserInfo', authenticate, updateUserInfo)
users.post('/findUsersByTag', authenticate, findUsersByTag)
users.get('/getUserProfile', authenticate, getUserProfile)
users.get('/getMatchesList', authenticate, getMatchesList)
users.post('/addUserToMatchList', authenticate, addUserToMatchList)
users.post('/deleteUser', deleteUser)

/**
 * @swagger
 * /user/deleteUser?username=String:
 *   post:
 *     summary: delete user from database
 *     description: searches for username in database and deletes matching profile
 *     responses:
 *       200: 
 *         description: user profile deleted
 */
function deleteUser(req, res) {
    let username = req.query.username
    let users = client.db('flannel').collection('users')
    users.findOneAndDelete({ username: username }, function (err, doc) {
        res.status(200).send(doc)
    })
}

/**
 * @swagger
 * /user?username=String:
 *   get:
 *     summary: return all users in the users collection
 *     description: searches for username in database and deletes matching profile
 *     parameters: 
 *       -  in: header
 *          name: authorization
 *          schema:
 *            type: string

 */

users.get('/', authenticate, function (req, res, next) {
    let users = client.db('flannel').collection('users')
    users.find().toArray((err, data) => {
        //get a list of all the users
        let tmp_data = []
        data.forEach((item) => {
            if (item.username !== req.query.username) {
                tmp_data.push(item)
            }
        })
        res.status(200).send(tmp_data) //.send(data)
    })
})

/**
 * @swagger
 * /user/getMatchesList?username=String:
 *   get:
 *     summary: return a users matches list
 *     description: searches for user in database and returns json object of all their matches
 *     parameters: 
 *       -  in: header
 *          name: authorization
 *          schema:
 *            type: string
 *     responses:
 *       '200':  
 *         content: 
 *           application/json:
 *             schema: 
 *              type: object
 *              properties: 
 *                usernamme: 
 *                  type: string
 *                id:
 *                  type: string

 */

function getMatchesList(req, res) {
    let username = req.query.username
    let users = client.db('flannel').collection('users')
    users.find({ username: username }).toArray(function (err, document) {
        if (err) res.status(500).send()
        let matches = document[0].matches
        res.status(200).send({ matches: matches })
    })
}

/**
 * @swagger
 * /user/addUserToMatchList?username=String:
 *   post:
 *     summary: adds a user to match list
 *     description: adds user specified by request body to request query user's match list
 *     parameters: 
 *       -  in: header
 *          name: authorization
 *          schema:
 *            type: string
 *     requestBody:
 *       content: 
 *         application/json:
 *           schema: 
 *            type: object
 *            properties: 
 *              usernamme: 
 *                type: string
 *              id:
 *                type: string

 */
function addUserToMatchList(req, res) {
    let username = req.query.username
    let match = {
        username: req.body.username,
        id: req.body.id,
    }
    let users = client.db('flannel').collection('users')
    users.findOneAndUpdate(
        { username: username },
        { $push: { matches: match } },
        function (err, doc) {
            if (err) res.status(500).send()
            res.status(200).send(doc)
        }
    )
}


function getUserProfile(req, res) {
    let userId = req.query.ID //get the userID
    let users = client.db('flannel').collection('users')
    users.find({ _id: new ObjectID(userId) }).toArray(function (err, document) {
        if (err) res.status(500).send() //internal error
        delete document[0].password
        res.status(200).send(document[0]) //send the entire user minus the pswd
    })
}

function findUsersByTag(req, res) {
    let interests = req.body.interests
    let users = client.db('flannel').collection('users')
    users
        .aggregate([
            { $unwind: '$interests' },
            { $match: { $expr: { $in: ['$interests', interests] } } },
        ])
        .toArray(function (err, docs) {
            res.status(200).send(docs)
        })
}
function createUserInfo(req, res) {
    let interests = req.body.interests
    let users = client.db('flannel').collection('users')
    users.findOneAndUpdate(
        { username: req.body.username },
        { $set: { interests: interests } },
        function (err, doc) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            res.send('createUserInfo')

            if (err) {
                res.status(400).send()
            }
        }
    )
}
function updateUserInfo(req, res) {
    let name = req.body.name
    let year = req.body.year
    let major = req.body.major
    let hometown = req.body.hometown
    let pronouns = req.body.pronouns
    let bio = req.body.bio
    let classes = req.body.classes
    let interests = req.body.interests
    let affiliations = req.body.affiliations
    let users = client.db('flannel').collection('users')
    users.findOneAndUpdate(
        { username: req.body.username },
        {
            $set: {
                name: name,
                year: year,
                major: major,
                hometown: hometown,
                pronouns: pronouns,
                bio: bio,
                classes: classes,
                interests: interests,
                affiliations: affiliations,
            },
        },
        function (err, doc) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            res.send('createUserInfo')

            if (err) {
                res.status(400).send()
            }
        }
    )
}

module.exports = users
