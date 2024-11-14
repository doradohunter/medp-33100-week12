var express = require('express');
const {ObjectId} = require("mongodb");
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const db = req.app.locals.db;  // Access the shared database instance
    const users = await db.collection('users').find({}).toArray(); // Adjust collection name as needed
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET user by ID
router.get('/:id', async function(req, res, next) {
  try {
    const db = req.app.locals.db;  // Access the shared database instance
    const id = req.params.id;
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) }); // Adjust collection name as needed
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST create user
router.post('/', async function(req, res, next) {
  try {
    const db = req.app.locals.db;  // Access the shared database instance
    const user = req.body;
    const result = await db.collection('users').insertOne(user); // Adjust collection name as needed
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
