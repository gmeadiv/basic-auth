'use strict';

const { user } = require('../models/User.js')

async function signIn(request, response) {
  try {

    let authString = request.headers.authorization;

    let encodedUserPass = authString.split(' ')[1];

    let decodedUserPass = await base64.decode(encodedUserPass);

    let [ user, pass ] = decodedUserPass.split(':');
   
    let userQuery = await user.findOne({where: { username: user}});

    let isValidPassword = await bcrypt.compare(pass, userQuery.password);
   
    if (isValidPassword) {
   
      response.send(userQuery);
   
    } else {

      response.status(401).send('unauthenticated');

    }
   
    
   
     } catch (error) {
       response.status(401).send('unauthenticated request');
     }
}

module.exports = {signIn};