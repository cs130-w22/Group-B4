const express = require('express');
const { resourceLimits } = require('worker_threads');
const labels = express.Router();
const client = require("../../../db");

labels.get('/', getLabelMatches);
labels.post("/createLabel", createLabel);


// match a url with a query like this: /label?labels=["cs130","cs180"]
// currently it just attempts to match a user that has cs130 || cs180, tbd
// whether we want to keep it this way or match cs130 && cs180
// just doing OR for simplicity of mongo query at the moment
async function getLabelMatches(req, res) {    
    let labels = [];
    if (req.query.labels !== undefined) {
        labels = JSON.parse(req.query.labels);
    }

    res.type('application/json');
    const resultObject = {};
    if (labels.length === 0) {
        // send empty object for now
        res.status(200);
        res.send(resultObject);
    }

    // get matching interests from db
    await client.db('flannel').collection('users').find({
        'interests': {            
            $in: labels
        }
    }).limit(5).toArray( async (err, result) => { 
        if(err) {
            console.err('error getting matching users: ', err)
            // return error with empty result object if there is a db error
            res.status(500);
            res.send({});
            return;
        } else {
            // success, set matches fields with array of matching users
            resultObject['matches'] = result;
            res.status(200);
            res.send(resultObject);
        }
    });        
}
function createLabel(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('createLabel');
}

module.exports = labels;