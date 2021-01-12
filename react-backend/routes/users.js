var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, username: "test"},
    {id: 2, username: "test_new"},
  ])
});

module.exports = router;
