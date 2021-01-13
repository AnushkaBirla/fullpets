const data = require('./databases/petsDB.js');
const animalList = require('./databases/animalList.js');
const animalToBreedList = require('./databases/animalToBreedList.js');


var express = require('express');
const { search } = require('../app.js');
var router = express.Router();

router.get('/animalList', function(req, res, next) {
    res.json(animalList)
});

router.get('/animalToBreedList', function(req, res, next) {
    var searchRes = animalToBreedList[req.query.animal]
    res.json(searchRes)
});

router.get('/petData', function(req, res, next) {
    var searchRes = []
    for (i = 0; i < data.length; i++) {
        if (data[i].animal === req.query.animal && data[i].breed === req.query.breed && data[i].age <= req.query.maxage && data[i].zipcode == (req.query.zip)) {
            searchRes.push(data[i])
        }
    }
    res.json(searchRes)
  });

router.get('/petDetails', function(req, res, next) {
    var searchRes = null
    for (i = 0; i < data.length; i++) {
        if (data[i].id == req.query.id) {
            searchRes = data[i]
        }
    }
    res.json(searchRes)
  });

module.exports = router;
