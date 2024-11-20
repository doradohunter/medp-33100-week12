var express = require('express');
const {ObjectId, Timestamp} = require("mongodb");
var router = express.Router();


router.get('/', async function (req, res, next) {
    try {
        const db = req.app.locals.db;  
        const posts = await db.collection('posts').aggregate([{
            $lookup: {
                from: 'users',                
                localField: 'authorID',       
                foreignField: '_id',          
                as: 'authors'           
            }
        }]).toArray();
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
