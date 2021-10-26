'use strict';

const { users } = require('../models/index.js');
const bcrypt = require('bcrypt');

users.beforeCreate( async (user) => {
  
  let encryptedPassword = await bcrypt.hash(user.password, 10);
  user.password = encryptedPassword;

})

async function signUp(request, response) {

  let userData = request.body;

  console.log(userData, '<-- USER DATA --<<')

  let newUser = await users.create({
    username: userData.username,
    password: userData.password,
  })

  response.status(201).send(newUser);
  console.log('CREATED NEW USER!')
}

module.exports = {signUp};