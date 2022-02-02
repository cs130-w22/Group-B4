const express = require('express');
const labels = express.Router();
const client = require("../../../db");

labels.get('/', getLabelMatches);
labels.get('/getLabels', getAllLabels);
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
        res.status(200).send(resultObject);
        return;
    }

    // get matching interests from db
    await client.db('flannel').collection('users').find({
        'interests': {            
            $in: labels
        }
    }).toArray( async (err, result) => { 
        if(err) {
            console.err('error getting matching users: ', err)
            // return error with empty result object if there is a db error
            res.status(500).send({});
            return;
        } else {
            // success, set matches fields with array of matching users
            resultObject['matches'] = result;            
            res.status(200).send(resultObject);
            return;
            // res.send(resultObject);
        }
    });        
}

// get all interests from interests table
async function getAllLabels(req, res) {
    await client.db('flannel').collection('interests')
    .find({}).toArray( async (err, result) => {
        if (err) {
            // send empty json array with 500 error if nothing found
            console.error('Error: ', err);
            res.status(500).send([]);
            return;
        } else {
            res.status(200).send(result);
            return;
        }
    });
}

// body: interest name
async function createLabel(req, res) {
    
    const interestName = req.body.interest;
    if (interestName === undefined) {
        res.status(400).send('interest parameter required');
        return;
    }

    // check if interest exists
    await client.db('flannel').collection('interests').find({
        'name': interestName
    }).toArray( async (err, result) => {
        if (err) {
            res.status(500).send('Error querying database');
            return;
        } else {
            if (result.length > 0) {
                // possibly use different status code
                res.status(200).send(('Interest already exists'));
                return;
            }
        }
    })

    // some sort of filter to make sure people aren't creating
    // in appropriate interests

    // insert interest if it doesn't exist
    await client.db('flannel').collection('interests').insertOne({
        name: interestName
    });    

    res.status(200).send('Interest created');
}

module.exports = labels;