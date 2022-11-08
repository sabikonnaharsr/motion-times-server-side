//git init korinai baki sob korsi
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;
require("dotenv").config();


// middleware
app.use(cors());
app.use(express.json());


// user: sequelExtractDb
// pass: 1j0PJa4mtnF16osm


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.svbs0rh.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// function starts
async function run(){
    const serviceCollection = client.db('weddingService').collection('weddingData');
    const weddingCollection = client.db('weddingService').collection('weddingOrder')
    try{

         


          app.get("/services", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
          });


          
            app.get(`/reviewServices/:id`, async (req, res) => {
                const id = req.params.id;
                const query = { _id: ObjectId(id) };
                const resultById = await serviceCollection.findOne(query);
                res.send(resultById);
                console.log(resultById)
            });



             //orders get all orders item
            app.post("/service", async (req, res) => {
                const user = req.body;
                console.log(user);
                const result = await weddingCollection.insertOne(user);
                res.send(result);
            });

            // patch update
            app.patch(`/reviewServices/:id`, async (req, res) => {
                const id = req.params.id;
                const status = req.body.status;
                const query = { _id: ObjectId(id) };
                const updateDoc = {
                $set: {
                    status: status,
                },
                };
                const result = await orderCollection.updateOne(query, updateDoc);
                res.send(result);
            });


            // delete
            app.delete("/deleteReview/:id", async (req, res) => {
                const id = req.params.id;
                const query = { _id: ObjectId(id) };
                const result = await orderCollection.deleteOne(query);
                res.send(result);
                console.log(result)
            });

    }finally{

    }

}
run().catch((e) => console.error(e));



app.get('/', (req, res)=> {
    res.send('sequel extract is running')
})



app.listen(port, () => {
    console.log(`Sequel Extract is running${port}`)
})










