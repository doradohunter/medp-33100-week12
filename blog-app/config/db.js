const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://doradocodes:eupMSKWQFytzA8HS@cluster0.feambhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// MongoDB connection setup
const client = new MongoClient(uri, {
    autoSelectFamily: false // required for node version over v18
});

async function connectToDatabase() {
    console.log('Connecting to MongoDB...');
    try {
        // Connect the client to the server
        await client.connect();

        // const database = await client.db('sample_mflix');
        // const database = await client.db('blog');
        console.log("Connected to MongoDB!");
        return client.db('blog');

        // const users = database.collection('users');
        // const allUsers = await users.find({}).toArray();
        // console.log('allUsers', allUsers);

        // const movies = database.collection('movies');
        // // Query for a movie that has the title 'Back to the Future'
        // const query = { title: 'Back to the Future' };
        // const movie = await movies.findOne(query);
        // console.log('query', movie);
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectToDatabase;

