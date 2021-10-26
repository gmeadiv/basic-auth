'use strict';

const app = require('./src/server.js.js');

const { db } = require('./src/models/index.js.js');

db.sync()
  .then(() => {
    app.start;
  })
  .catch(console.error);