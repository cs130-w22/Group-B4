const { equal } = require('assert');
let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (req, res, next) => {
    let cookies = req.headers['cookie'].split(";")
    let token = "";
    for(cookie in cookies) {
        broken = cookies[cookie].split("=")
        if(broken[0] === 'jwt') {
            token = broken[1]
            break;
        }
    }

    jwt.verify(token, process.env.SALT_HASH, function(err, decoded) {
        if(err)
        {
            console.log(err)
            res.status(401).send();
            return;
        }
        if(decoded.usr === req.body.username)
        {
            const now = new Date();
            const seconds = Math.round(now.getTime() / 1000);

            if(seconds > decoded.exp)
            {
                res.satus(401).send("unauthorized!");
                return;
            }
            next();
        }
        else 
        {
            res.status(401).send("unauthorized!");
            return;  
        }
    })
    //middleware to handle authentication 
    
}

module.exports = auth