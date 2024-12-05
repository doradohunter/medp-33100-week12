var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res) {
    console.log(req.body);

    try{
        const db = req.app.locals.db;
        const newAlbum = {
            title: req.body.title, 
            release_date: req.body.release_date,
            tracks: req.body.tracks,
            color: req.body.color
        }
        await db.collection('albums')
            .insertOne(newAlbum)
        res.send('successfully added album');    
    } catch(error){
        console.log(error);
    }
    
})

router.put('/', async function (req, res) {
    console.log('MAKING PUT REQUEST');
    console.log(req.body);
})
module.exports = router;