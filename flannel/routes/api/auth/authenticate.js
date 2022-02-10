const { equal } = require('assert');
let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (req, res, next) => {
    
    let auth = req.headers.authorization;
    console.log(auth);
    let broken = auth.split('=')
    let token = broken[1]
    console.log('\nhere\n');
    console.log(token)
    

    jwt.verify(token, process.env.SALT_HASH, function(err, decoded) {
        if(err)
        {
            console.log(err)
            res.status(401).send();
            return;
        }

        if(decoded.usr === req.query.username)
        {
            const now = new Date();
            const seconds = Math.round(now.getTime() / 1000);

            
            if(seconds > decoded.exp)
            {
                res.satus(401).send("unauthorized - expired!");
                return;
            }
            next();
        }
        else 
        {
            res.status(401).send("unauthorized - not matching!");
            return;  
        }
    })
    //middleware to handle authentication 
    
}

module.exports = auth