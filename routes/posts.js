var express = require('express');
var router = express.Router();
const {ObjectId, Timestamp} = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function (req, res) {
    console.log(req.body);

    try {
        const db = req.app.locals.db;
        const newPost = {
            title: req.body.title,
            featuring: req.body.featuring,
            length: req.body.length,
            authorID: new ObjectId(req.body.authorID),
            createdAt: new Timestamp({ t: Math.floor(Date.now() / 1000), i:0 }),
        }
        await db.collection('album')
            .insertOne(newPost)
        res.send ('Successful created post!');
    } catch(error) {
        console.log(error); 
    }
})

module.exports = router;
