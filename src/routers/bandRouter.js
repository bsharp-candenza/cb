const express = require('express');
const debug = require('debug')('app:bandRouter');
const { MongoClient, ObjectID } = require('mongodb');


const bandRouter = express.Router();
bandRouter.use((req, res, next) => {
  if (req.user) {
    debug('Has user = Yes');
    next();
  } else {
    debug('Has user = No');
    res.render('bandSignup');
  }
});

bandRouter.route('/').get((req, res) => {
  const url =
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}?retryWrites=true&w=majority`;
  const dbName = 'compositions';

  (async function mongo() {
    let client;
    try {
      debug('asdf');
      client = await MongoClient.connect(url,{useUnifiedTopology:true});
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const bandmusic = await db.collection('flutechoirmusic').find().toArray();
      debug(bandmusic);
      debug('before rendering bandmusic');
      res.render('band', { bandmusic });
      debug('after render of band_music');
    } catch (error) {
      debug('Error occurred----------------');
      debug(error.stack);
    }
    client.close();
  })();
});

bandRouter.route('/:id').get((req, res) => {
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

module.exports = bandRouter;
