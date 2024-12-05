var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/:bookId', async function (req, res) {
  console.log(req.body);
  try {
    const db = req.app.locals.db;
    const bookId = req.params.bookId;

    await db.collection('Books')
        .updateOne({ _id: new ObjectId(bookId)}, {$inc: { availableCopies: 1 }})
      
    res.send('Sucessfully created new Member')
  } catch(error){
    console.log(error)
  }
})

router.delete('/:bookId', async function (req, res) {
    console.log(req.body);
    try {
      const db = req.app.locals.db;
      const bookId = req.params.bookId;
  
      await db.collection('Books')
          .deleteOne({ _id: new ObjectId(bookId)})
        
      res.send('Sucessfully created new Member')
    } catch(error){
      console.log(error)
    }
  })
module.exports = router;