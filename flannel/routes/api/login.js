let express = require('express')
let router = express.Router();
let client = require("../../db.js");
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

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

        //if temp array has an item then a user exists in the databse 
        const now = new Date();
        const seconds = (Math.round(now.getTime() / 1000) + 7200);

        let payload = {
            exp: seconds,
            usr: temp_array[0].username
        }
        let private_key = process.env.SALT_HASH;
        jwt.sign(payload, private_key, {}, function(err, token) {
            response.cookie('jwt', token);
            //can do the redirect next
            response.status(200).send("user authenticated"); //this will be a redirect if we choose to add it 
        })
        
    })

    
})

router.post('/register', function(request, response, next) {
    if(!request.body.username || !request.body.password) 
    {
        response.status(401).send("unauthorized!");
        return;
    }
    //
    let users = client.db('flannel').collection('users');
    let query_string = {"username": request.body.username}
    users.find(query_string).toArray((err, res) => {
        if(res.length != 0) { //means that there is already a user in the databse with the email
            return response.status(400).send("user exists");
        } //otherwise we can add the user to the databse 

        var password = request.body.password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hashvalue) {
                users.insertOne({"username": request.body.username, password: hashvalue}, function(err, inserted) {
                    //handle error later 
                    response.status(200).send(inserted)
                })
            })
        })
    })
    
});

module.exports = router;