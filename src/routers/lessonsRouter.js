const express = require('express');
const debug = require('debug')('app:lessonsRouter');
const { MongoClient, ObjectID } = require('mongodb');

const lessonsRouter = express.Router();
lessonsRouter.use((req, res, next) => {
  if (req.user) {
    res.render('lessons');
  } else {
    res.render('lessons');
  }
});

module.exports = lessonsRouter;
