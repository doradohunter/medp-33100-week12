const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const connectToDatabase = require('../config/db');

// GET home page
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const teas = await db.collection('teas').find().toArray();
    const users = await db.collection('users').find().toArray();
    const comments = await db.collection('comments').find().toArray();

    res.render('index', {
      teas,
      users,
      comments,
    });
  } catch (error) {
    console.error("Error retrieving collections:", error.message);
    res.render('index', { teas: [], users: [], comments: [] });
  }
});

// POST endpoint to add a new tea
router.post('/teas', async (req, res) => {
  try {
    console.log("Request body received:", req.body); // Debug
    const db = await connectToDatabase();
    const newTea = req.body; // Expect { name, type, origin, brewTemperature, brewTimeMinutes }
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connected!");
  
    const result = await db.collection('teas').insertOne(newTea);

    console.log("Insert result:", result); // Debug
    res.status(201).json({ message: 'Tea added successfully', tea: result.ops[0] });
  } catch (error) {
    console.error("Error adding tea:", error.message);
    res.status(500).json({ error: "Failed to add tea" });
  }
});

// PUT endpoint to update a tea
router.put('/teas/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    const updatedTea = req.body;

    const result = await db.collection('teas').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedTea }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Tea not found" });
    }

    res.json({ message: "Tea updated successfully" });
  } catch (error) {
    console.error("Error updating tea:", error.message);
    res.status(500).json({ error: "Failed to update tea" });
  }
});

// DELETE endpoint to remove a tea
router.delete('/teas/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    const result = await db.collection('teas').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Tea not found" });
    }

    res.json({ message: "Tea deleted successfully" });
  } catch (error) {
    console.error("Error deleting tea:", error.message);
    res.status(500).json({ error: "Failed to delete tea" });
  }
});

module.exports = router;
