
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://erika6776:Np2y4YdmPAXMCcap@cluster0.xs1p3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  autoSelectFamily: false
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("test");
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; 
  }
}

module.exports = connectToDatabase;