var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const nyc = await db.collection("nyc").find().toArray();
    console.log(nyc);
    res.render("index", { title: "nyc", nyc: nyc });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
