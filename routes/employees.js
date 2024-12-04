var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async function(req, res){
    console.log(req.body)
    try {
        const db = req.app.locals.db;
        const newEmployee = {
            name: req.body.name,
            email: req.body.email,
            depID: new ObjectId(req.body.depID),
            titleID: new ObjectId(req.body.titleID)
        }
        await db.collection('employees')
            .insertOne(newEmployee)
            res.send('we got it!')
    } catch (error) {
        console.log('uh oh :(')
    }
    
})

router.put('/', async function(req, res){
    console.log('pulling!~')
    try {
        const db = req.app.locals.db;
        const test= await db.collection('employees')
            // .find({_id: new ObjectId(req.body.id)})
            // .toArray()
            .updateOne(
                {_id: new ObjectId(req.body.id)},
                {$set: {
                    name: req.body.name,
                    email: req.body.email
                }}
            )
        console.log(test)
    } catch (error) {
        console.log('error when updating!!!')
    }
})

router.delete('/:id', async function (req, res){
    //console.log(req.params.id)
    try {
        const db = req.app.locals.db;
        await db.collection('employees')
            .deleteOne({_id: new ObjectId(req.params.id)})
    } catch (error) {
        console.log('error when deleting data!!!')
    }
})

module.exports = router;