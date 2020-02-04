const express = require('express');
const path = require('path');
const dbController = require('../controllers/dbController.js');

const router = express.Router();

router.post('/signup', dbController.createUser, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../src/index.html'));
});

router.post('/login', dbController.verifyUser, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../src/index.html'));
});

router.post('/getWaitTimes', dbController.getWaitTimes, (req, res) => {
  res.status(200).json(res.locals.results);
});

router.post('/addWaitTime', dbController.addVenue, dbController.addWaitTime, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
