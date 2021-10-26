
'use strict';

const express = require('express');
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('./User.js');

const app = express();

console.log(process.env.NODE_ENV, '<-- NODE_ENV -<<');

const sequelize = new Sequelize('sqlite:memory' || process.env.DATABASE_URL);

app.use(express.urlencoded({ extended: true }));

const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users,
};