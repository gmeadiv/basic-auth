'use strict';

const app = require('./app.js');
const { Sequelize } = require('sequelize');

const PORT = process.env.PORT;

const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log('server is running on', PORT));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });