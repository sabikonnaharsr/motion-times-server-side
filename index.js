//git init korinai baki sob korsi
const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// user: sequelExtractDb
// pass: 1j0PJa4mtnF16osm

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.svbs0rh.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});




// function starts
async function run() {
  const serviceCollection = client
    .db("weddingService")
    .collection("weddingData");
  const weddingCollection = client
    .db("weddingService")
    .collection("weddingOrder");
  try {
    // there services
    app.get("/threeServices", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });

    //   allServices get from express js
    app.get("/allServices", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    /// sggll
    app.post("/allServices", async (req, res) => {
      const services = req.body;
      console.log(services);
      const result = await serviceCollection.insertOne(services);
      res.send(result);
    });

    //asdd servi
    -(
      // app.get(`/addServices/:id`, async (req, res) => {
      //     const id = req.params.id;
      //     const query = { _id: ObjectId(id) };
      //     const resultById = await serviceCollection.findOne(query);
      //     res.send(resultById);

      // });

      app.get(`/services/:id`, async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const resultById = await serviceCollection.findOne(query);
        res.send(resultById);
      })
    );

    //orders get all orders from client
    app.post("/clientReview", async (req, res) => {
      const user = req.body;
      const result = await weddingCollection.insertOne(user);
      res.send(result);
    });

    // patch update
    app.patch(`/updateReview/:id`, async (req, res) => {
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



    // // delete
    // app.delete("/deleteReview/:id", async (req, res) => {
    //     const id = req.params.id;
    //     const query = { _id: ObjectId(id) };
    //     const result = await orderCollection.deleteOne(query);
    //     res.send(result);
    //     console.log(result)
    // });



    //review client sabikonnahar
    app.get("/review", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = weddingCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });



    //all client reviews sabikonnahar
    app.get("/allReview", async (req, res) => {
      id = req.query.serviceId;
      let query = { serviceId: id };
      const cursor = weddingCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });
  } finally {
  }
}
run().catch((e) => console.error(e));


app.get("/", (req, res) => {
  res.send("sequel extract is running");
});


app.listen(port, () => {
  console.log(`Sequel Extract is running${port}`);
});



//remove review

// app.delete('/review/:id', async (req, res) => {
//     const id = req.params.id;
//     const query = { _id: ObjectId(id) };
//     const result = await reviewCollection.deleteOne(query);
//     res.send(result);
// })
