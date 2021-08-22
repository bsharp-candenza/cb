const express = require('express');
const debug = require('debug')('app:herstoryRouter');
const { MongoClient, ObjectID } = require('mongodb');

const herstoryRouter = express.Router();
herstoryRouter.use((req, res, next) => {
  if (req.user) {
    res.render('her-story');
  } else {
    res.render('her-story');
  }
});

module.exports = herstoryRouter;
