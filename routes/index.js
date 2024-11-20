var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const habits = await db.collection('habits').find().toArray();
    res.render('index', { title: 'Express', habits: habits });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
