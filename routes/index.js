var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const db = await connectToDatabase();
    const animals = await db.collection('animals').find().toArray();

    res.render('index', { animals: animals });
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.render('index', { animals: [] });
  }
});

module.exports = router;


