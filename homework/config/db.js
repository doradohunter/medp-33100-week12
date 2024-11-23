const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://vickiwu2:1234@cluster0.lfd1l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  autoSelectFamily: false,
});

async function connectToDatabase() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    return client.db("restaurants");
  } catch (error) {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

module.exports = connectToDatabase;
