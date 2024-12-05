var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function (req, res) {
  console.log(req.body);
  try {
    const db = req.app.locals.db;
    const newMember = {
      _id: new ObjectId(),
      name: req.body.name,
      memberSince: req.body.memberSince,
      borrowedBooks: req.body.borrowedBooks
    }
    await db.collection('Members')
      .insertOne(newMember)
    res.send('Sucessfully created new Member')
  } catch(error){
    console.log(error)
  }
})
module.exports = router;