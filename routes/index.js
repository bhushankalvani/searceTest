var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.locArr);
  res.render('index', { title: 'Location Tracker' , coords: JSON.stringify(req.locArr) });
});

module.exports = router;
