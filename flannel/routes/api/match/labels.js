const express = require('express');
const labels = express.Router();
const client = require("../../../db");
const authenticate = require('../auth/authenticate.js');

labels.get('/', authenticate, getLabelMatches);
labels.get('/getLabels', getAllLabels);
labels.post("/createLabel", authenticate, createLabel);



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
        $or: [
            {
                'interests': {            
                    $in: labels
                },
            },
            {
                'classes': {
                    $in: labels
                },
            },
            {
                'affiliations': {
                    $in: labels
                },
            },
        ],
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

// define type enum that will be used as one of three discrete types of labels
const LABELTYPE = {
    CLASSES: 'classes',
    INTERESTS: 'interests',
    AFFILS: 'affiliations'
};



/*
body of request contains: {
    interest: string representation of label's name
    type: string representation of type of interest (defined by LABELTYPE above)
}
*/
async function createLabel(req, res) {
    
    // get interestName and type from post request
    const interestName = req.body.interest;
    const type = req.body.type;
    if (interestName === undefined) {
        res.status(400).send('interest parameter required');
        return;
    }
    if (type === undefined) {
        res.status(400).send('type parameter required');
        return;
    }

    // check that specified type is one of our valid types
    if (!(type === LABELTYPE.CLASSES || type === LABELTYPE.INTERESTS || type === LABELTYPE.AFFILS)) {
        res.status(400).send(`type parameter must be one of the following: 
        ${LABELTYPE.CLASSES}, ${LABELTYPE.INTERESTS}, ${LABELTYPE.AFFILS}`);
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
            } else {
                // insert interest if it doesn't exist
                await client.db('flannel').collection('interests').insertOne({
                    name: interestName,
                    type
                });    
                res.status(200).send('Interest created');
                return;
            }
        }
    })    
}

module.exports = labels;