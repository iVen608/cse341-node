//Code provided from W02 Team Solution
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
let _db;
const initDb = (callback) => {
  if (_db) {
    console.log('Database initialized');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URII)
    //MongoClient.connect(x)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};
const getDb = () => {
  if (!_db) {
    throw Error('Database is not initialized');
  }
  return _db;
};
module.exports = { initDb, getDb };

