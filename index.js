'use strict';

const app = require('./src/server.js');
const { db } = require('./src/models/index.js');

db.sync()
  .then(() => {
    app.start;
  })
  .catch(console.error);