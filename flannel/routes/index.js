var express = require('express');
var router = express.Router();
var path = require('path')

/* GET home page */ 
router.get('/', function(req, res, next) {
    res.statusCode = 200;
    res.send()
});

module.exports = router;