var express = require('express');
const {ObjectId} = require("mongodb");
var router = express.Router();


router.get('/', async function(req, res, next) {
  try {
    const db = req.app.locals.db; 
    const users = await db.collection('users').find({}).toArray(); 
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
