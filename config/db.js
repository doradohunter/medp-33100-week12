const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://Abdul:kzZ8AqPFuBjDoVXy@cluster0.pqelm.mongodb.net/habit_tracker?retryWrites=true&w=majority&appName=Cluster0';

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
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );

    return client.db();
  } catch (error) {
    await client.close();
  }
}

module.exports = connectToDatabase;
