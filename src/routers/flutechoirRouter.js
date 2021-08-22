const express = require('express');
const debug = require('debug')('app:flutechoirRouter');
const { MongoClient, ObjectID } = require('mongodb');

const flutechoirRouter = express.Router();
flutechoirRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render('flutechoirSignup');
  }
});

flutechoirRouter.route('/').get((req, res) => {
  const url =
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}?retryWrites=true&w=majority`;
  const dbName = 'compositions';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url,{useUnifiedTopology:true});
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const flutechoirmusic = await db.collection('flutechoirmusic').find().toArray();

      res.render('flutechoir', { flutechoirmusic });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

flutechoirRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url =
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}?retryWrites=true&w=majority`;
  const dbName = 'compositions';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url,{useUnifiedTopology:true});
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const session = await db
        .collection('flutechoirmusic')
        .findOne({ _id: new ObjectID(id) });


      res.render('session', {session});
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = flutechoirRouter;
