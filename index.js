const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

// Middleware 
app.use(cors());
app.use(express.json());

// Connection With DB ----------------------------------------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h80zj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db('car-mechanics');
        const servicesCollection = database.collection('services');

        // Get API 
        app.get('/services', async (req, res)=>{
            const cursor = servicesCollection.find({})
            const services = await cursor.toArray();
            res.send(services);
        })

        // Get Single Service 
        app.get('/services/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })

        // Post API 
        app.post('/services', async(req, res)=>{
            const service = req.body;
            console.log(service);

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result)
        })

        // Delete API 
        app.delete('/services/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await servicesCollection.deleteOne(query);
            res.json(result)
        })
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