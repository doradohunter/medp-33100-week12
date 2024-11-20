
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbUser:m0MIb4fTy0XbkYZ7@cluster0.nhebv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  autoSelectFamily: false 
});

async function connectToDatabase() {
  console.log('Connecting to MongoDB...');
  try {
      await client.connect();
      console.log("Connected to MongoDB!");
      return client.db('blog');
  } catch (err) {
      console.error("Failed to connect to MongoDB", err);
  }
}

module.exports = connectToDatabase;