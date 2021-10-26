const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 5000;

// Connection With DB ----------------------------------------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h80zj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('Connected to db');
    }
    finally{
        // await client.close(); 
    }
}
run().catch(console.dir);

// --------------------------------------------------------------- 


app.get('/', (req, res)=>{
    console.log('Running Server')
    res.send('Running Server')
})

app.listen(port, ()=>{
    console.log('server running on port', port);
})