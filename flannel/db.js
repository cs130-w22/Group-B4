
const { MongoClient } = require('mongodb');
const options = { useUnifiedTopology: true, writeConcern: {j : true}};
let client = null;


function connect(url, callback) 
{
    if(client == null)
    {
        client = new MongoClient(url, options);
        client.connect((err) => {
            if(err)
            {
                console.log(url)
                client = null; 
                callback(err);
            }
            else 
            {
                callback();
            }
        });
    }
    else 
    {
        callback();
    }
}

function db(dbName)
{
    return client.db(dbName);
}

function close()
{
    if(client) 
    {
        client.close();
        client = null; 
    }
}

module.exports = {
    connect, 
    db, 
    close 
}