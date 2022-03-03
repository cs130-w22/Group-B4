/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const client = require('../../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createLogicalNot } = require('typescript')

router.post('/', login)


function generateJWT(username, response) {
    const now = new Date()
    const seconds = Math.round(now.getTime() / 1000) + 7200

    let payload = {
        exp: seconds,
        usr: username,
    }
    let private_key = process.env.SALT_HASH
    jwt.sign(payload, private_key, {}, function (err, token) {
        return token
    })
}

/**
 * @swagger
 * /login:
 *   post:
 *     summary: allows an existing user to login to our site
 *     requestBody: 
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               usernamme: 
 *                 type: string
 *               password:
 *                 type: string
 *         
 *     description: searches for user in db and returns JWT if they exist
 *     responses:
 *       401:
 *         description: unauthorized!
 *       200: 
 *         description: user exists and is now logged in 
 */
function login (request, response, next) {
    if (!request.body.username || !request.body.password) {
        response.status(401).send('unauthorized!')
        return
    }
    let users = client.db('flannel').collection('users')
    let query_string = { username: request.body.username }
    users.find(query_string).toArray((err, res) => {
        if (res.length == 0) {
            //no user exists so exit
            response.status(401).send('User does not exist!')
            return
        }
        var temp_array = []
        res.forEach((item) => {
            var compare = bcrypt.compareSync(request.body.password, item.password)
            if (compare) {
                temp_array.push(item)
            }
        })

        if (temp_array.length == 0) response.status(400).send()
        //if temp array has an item then a user exists in the databse
        const now = new Date()
        const seconds = Math.round(now.getTime() / 1000) + 7200

        let payload = {
            exp: seconds,
            usr: request.body.username,
        }
        let private_key = process.env.SALT_HASH
        jwt.sign(payload, private_key, {}, function (err, token) {
            delete temp_array[0].password
            response.cookie('jwt', token)
            response.status(200).send({ jwt: token, user: temp_array[0] })
            return
            
        })
    })
}

/**
 * @swagger
 * /register:
 *   post:
 *     summary: allows a new user to create a profile and login
 *     requestBody: 
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               password:
 *                 type: string
 *               name: 
 *                 type: string
 *               major:
 *                 type: string
 *               email:
 *                 type: string
 *               Hometown:
 *                 type: string
 *               Pronouns:
 *                 type: string
 *               Bio:
 *                 type: string
 *               Classes:
 *                 type: object
 *               Interests:
 *                 type: object
 *               Affiliations:
 *                 type: object
 *               
 *         
 *     description: creates a new entry correlated to request body in our database, and returns a JWT
 *     responses:
 *       401:
 *         description: unauthorized!
 *       201: 
 *         description: user profile created and JWT returned
 */
router.post('/register', function (request, response, next) {
    //create a new user profile
    if (!request.body.username || !request.body.password) {
        response.status(401).send('unauthorized!')
        return
    }

    let users = client.db('flannel').collection('users')
    let query_string = { username: request.body.username }
    users.find(query_string).toArray((err, res) => {
        if (res.length != 0) {
            //means that there is already a user in the databse with the email
            return response.status(400).send({ msg: 'exists' })
        } //otherwise we can add the user to the databse

        //to add the user to the databse, need to first validate the email
        let email = request.body.username
        let split_email = email.split('@')

        if (
            split_email.length == 1 ||
            (split_email[1] !== 'g.ucla.edu' && split_email[1] !== 'ucla.edu')
        ) {
            //does not contain the @ symbol so forsure not an email
            return response.status(400).send()
        }

        var password = request.body.password
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hashvalue) {
                let insertItem = request.body
                insertItem.password = hashvalue
                insertItem.matches = []
                users.insertOne(insertItem, function (err, inserted) {
                    //handle error later
                    const now = new Date()
                    const seconds = Math.round(now.getTime() / 1000) + 7200

                    let payload = {
                        exp: seconds,
                        usr: request.body.username,
                    }
                    let private_key = process.env.SALT_HASH
                    jwt.sign(payload, private_key, {}, function (err, token) {
                        response.cookie('jwt', token)
                        response.status(201).send({ jwt: token, user: insertItem })
                        return
                    })
                })
            })
        })
    })
})

module.exports = router
