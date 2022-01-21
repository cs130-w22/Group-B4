const express = require('express');
const labels = express.Router();
const client = require("../../../db");

labels.get('/', getLabelMatches);
labels.post("/createLabel", createLabel);

function getLabelMatches(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('getLabelMatches');
}
function createLabel(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('createLabel');
}

module.exports = labels;