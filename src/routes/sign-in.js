'use strict';

const { users } = require('../models/index.js');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

async function signIn(request, response) {

  // let encryptedPassword = await bcrypt.hash(users.password, 10);
  // users.password = encryptedPassword;

  try {

    let authString = request.headers.authorization;

    let encodedUserPass = authString.split(' ')[1];

    let decodedUserPass = await base64.decode(encodedUserPass);

    let [ user, pass ] = decodedUserPass.split(':');
   
    let userQuery = await users.findOne({where: { username: user}});

    let userQueryPWord = userQuery.password;

    console.log(pass, '<-- PASS || USER QUERY -->', userQueryPWord);

    let isValidPassword = await bcrypt.compare(pass, userQueryPWord);
   
    if (isValidPassword) {
   
      response.send(userQuery);
   
    } else {

      response.status(401).send('password doesn\'t match');

    }
   
     } catch (error) {
       response.status(401).send('unauthenticated request');
     }
}

module.exports = {signIn};