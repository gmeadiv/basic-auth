'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();


const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Users.beforeCreate( async (user) => {

  let encryptedPassword = await bcrypt.hash(user.password, 10);
  user.password = encryptedPassword;

})

// app.post('/signup', async (req, res) => {

//   try {
//     req.body.password = await bcrypt.hash(req.body.password, 10);
//     const record = await Users.create(req.body);
//     res.status(200).json(record);

//   } catch (e) { 
//     res.status(403).send("Error Creating User"); 
//   }

// });

app.post('/signup', async (request, response) => {

  let userData = request.body;

  let newUser = await Users.create({ 
    username: userData.username, 
    password: userData.password
  })

  response.send(newUser);

})


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', async (req, res) => {
  console.log(req.headers.authorization, '<-- REQ DOT HEADERS --<<')

  /*
    req.headers.authorization is : "Basic sdkjdsljd="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */

  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      console.log(valid, '<-- VALID --<<')
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User')
    }
  } catch (error) { res.status(403).send("Invalid Login"); }

});

// make sure our tables are created, start up the HTTP server.
module.exports = app;