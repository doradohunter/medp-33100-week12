const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lindayu246:BrUzcxurqFeTYC81@cluster1.3fm1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
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

  const db = client.db("database1");
  return db;
} catch (error) {
  console.error("Error connecting to the database:", error);
  throw error; 
}
}

module.exports = connectToDatabase; 