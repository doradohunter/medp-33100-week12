var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

// GET home page
router.get('/', async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const nyc = await db.collection('nyc').find().toArray();
    res.render('index', { title: 'NYC Restaurants', nyc: nyc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE restaurant - remove the /restaurants prefix
router.delete('/:id', async function (req, res) {
  try {
    const db = req.app.locals.db;
    console.log('Delete request received for ID:', req.params.id);

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const result = await db.collection('nyc').deleteOne({
      _id: new ObjectId(req.params.id),
    });

    console.log('Delete result:', result);

    if (result.deletedCount === 1) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST new restaurant - remove the /restaurants prefix
router.post('/', async function (req, res) {
  try {
    const db = req.app.locals.db;
    const { name, type, borough } = req.body;
    const result = await db.collection('nyc').insertOne({ name, type, borough });
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update restaurant - remove the /restaurants prefix
router.put('/:id', async function (req, res) {
  try {
    const db = req.app.locals.db;
    const { name, type, borough } = req.body;

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const result = await db
      .collection('nyc')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: { name, type, borough } });

    if (result.matchedCount === 1) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
