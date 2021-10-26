'use strict';

const { db } = require('../src/models/index.js');
const supertest = require('supertest');
const app = require('../src/server.js');
let request = supertest(app.server);

beforeAll(async () => {
  await db.sync();
});

// afterAll(async () => {
//   await db.drop();
// });

xdescribe('Testing Sign Up', () => {
  it('should create a username and password on POST /signup', async () => {

    const response = await request.post('/signup');

    expect(response.status).toBe(201);
  });
});

xdescribe('Testing Sign In', () => {
  it('should create a username and password on POST /signin', async () => {

    const response = await request.post('/signin');

    expect(response.status).toBe(201);
  });
});