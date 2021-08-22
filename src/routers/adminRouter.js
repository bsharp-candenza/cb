const { greenBright } = require('chalk');
const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const dsu_flute_choir_music = require('../data/dsu_flute_choir_music.json');
const videos_music = require('../data/video.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  const url =
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}?retryWrites=true&w=majority`;
  const dbName = 'compositions';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url,{useUnifiedTopology:true});
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      //const response = await db.collection('flutechoirmusic').insertMany(dsu_flute_choir_music);
      const response = await db.collection('video').insertMany(videos_music);
      res.json(response,);
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = adminRouter;
