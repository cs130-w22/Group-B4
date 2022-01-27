let express = require('express')
let router = express.Router();
let client = require("../../db.js");
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

function generateJWT(username) {
    const now = new Date();
    const seconds = (Math.round(now.getTime() / 1000) + 7200);

    let payload = {
        exp: seconds,
        usr: username
    }
    let private_key = process.env.SALT_HASH;
    jwt.sign(payload, private_key, {}, function(err, token) {

        return token;
    })
}


router.post('/', function(request, response, next) {
    if(!request.body.username || !request.body.password) 
    {
        response.status(401).send("unauthorized!");
        return;
    }

    let users = client.db('flannel').collection('users');
    let query_string = {"username": request.body.username}

    users.find(query_string).toArray((err, res) => {
        if(res.length == 0) { //no user exists so exit
            response.status(401).send("User does not exist!")
            return 
        }

        var temp_array = []
        res.forEach((item) => {
            var compare = bcrypt.compareSync(request.body.password, item.password)
            if(compare) {
                temp_array.push(item)
            }
        })

        if(temp_array.length == 0)
            response.status(400).send()
        //if temp array has an item then a user exists in the databse 

        let token = generateJWT(temp_array[0].username);
        response.cookie('jwt', token);
        response.status(200).send('user authenticated')
    })

    
})

router.post('/register', function(request, response, next) { //create a new user profile 
    if(!request.body.username || !request.body.password) 
    {
        response.status(401).send("unauthorized!");
        return;
    }
    
    let users = client.db('flannel').collection('users');
    let query_string = {"username": request.body.username}
    users.find(query_string).toArray((err, res) => {
        if(res.length != 0) { //means that there is already a user in the databse with the email
            return response.status(400).send("user exists");
        } //otherwise we can add the user to the databse 

        //to add the user to the databse, need to first validate the email
        let email = request.body.username;
        let split_email = email.split('@')

        if(split_email.length == 1 || (split_email[1] !== 'g.ucla.edu' && split_email[1] !== "ucla.edu")) { //does not contain the @ symbol so forsure not an email
            return response.status(400).send();
        } 


        var password = request.body.password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hashvalue) {
                users.insertOne({"username": request.body.username, password: hashvalue}, function(err, inserted) {
                    //handle error later 
                    let token = generateJWT(request.body.username);
                    response.cookie('jwt', token);
                    return response.status(201).send(inserted);
                })
            })
        })
    })
    
});

module.exports = router;