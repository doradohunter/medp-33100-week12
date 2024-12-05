var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function (req, res) {
  console.log(req.body);
  try {
    const db = req.app.locals.db;
    const newPost = {
      activity: req.body.activity,
      category: req.body.category,
      description: req.body.description,
      frequency: req.body.frequency,
    };

    const result = await db.collection('habits').insertOne(newPost);
    console.log('Inserted document:', result.insertedId);
    res.send('Document inserted successfully');
  } catch (error) {
    console.error('Error inserting document:', error);
  }
});

router.put('/', async function (req, res) {
  try {
    const db = req.app.locals.db;
    await db.collection('habits').updateOne(
      { activity: req.body.activity },
      { $set: { activity: req.body.activity } }
    );    
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;
