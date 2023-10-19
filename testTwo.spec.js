// Import necessary modules
const request = require('supertest');
const app = require('./app'); // Adjust the path to your app.js file

describe('GET /', () => {
  it('should match the snapshot', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot();
  });
});
