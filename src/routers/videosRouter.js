const express = require('express');
const debug = require('debug')('app:videosRouter');
const { MongoClient, ObjectID } = require('mongodb');

const videosRouter = express.Router();
videosRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render('videosSignup');
  }
});

videosRouter.route('/').get((req, res) => {
  const url =
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}?retryWrites=true&w=majority`;
  const dbName = 'compositions';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url,{useUnifiedTopology:true});
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const videosmusic = await db.collection('video').find().toArray();

      res.render('videos', { videosmusic });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

videosRouter.route('/:id').get((req, res) => {
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
        .collection('video')
        .findOne({ _id: new ObjectID(id) });

      res.render('session', {session});
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = videosRouter;
