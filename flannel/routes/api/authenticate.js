const { equal } = require('assert')
let express = require('express')
let router = express.Router()
let jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const auth = (req, res, next) => {
    let auth = req.headers.authorization

    let broken = auth.split('=')
    let token = broken[1]
    // console.log(token)

    jwt.verify(token, process.env.SALT_HASH, function (err, decoded) {
        if (err) {
            console.log('Authenticate.js line 17')
            res.status(401).send()
            return
        }

        if (decoded.usr === req.query.username) {
            const now = new Date()
            const seconds = Math.round(now.getTime() / 1000)

            if (seconds > decoded.exp) {
                console.log('Authenticate.js line 27')
                res.status(401).send('unauthorized!')
                return
            }
            next()
        } else {
            console.log('Autenticate.js line 33')
            res.status(401).send('unauthorized!')
            return
        }
    })
    //middleware to handle authentication
}

module.exports = auth
