'use strict';

const { user } = require('../models/User.js');

async function signUp(request, response) {
  let userData = request.body;

  let newUser = await user.create({
    username: userData.username,
    password: userData.password,
  })

  response.send(newUser);
  console.log('CREATED NEW USER!')
}

module.exports = {signUp};