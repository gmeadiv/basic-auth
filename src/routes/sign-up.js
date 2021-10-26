'use strict';

const { users } = require('../models/index.js');

async function signUp(request, response) {
  let userData = request.body;

  console.log(userData, '<-- USER DATA --<<')

  let newUser = await users.create({
    username: userData.username,
    password: userData.password,
  })

  response.send(newUser);
  console.log('CREATED NEW USER!')
}

module.exports = {signUp};