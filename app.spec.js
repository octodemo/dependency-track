// test file for app.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('GET /user/:id', () => {
    it('should return a user by ID', async () => {
      const res = await chai.request(app).get('/user/1');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('email');
    });

    it('should return a 404 error for an invalid user ID', async () => {
      const res = await chai.request(app).get('/user/invalid');
      expect(res).to.have.status(404);
    });
  });

  describe('GET /user/:id/balance', () => {
    it('should return a user balance by ID', async () => {
      const res = await chai.request(app).get('/user/1/balance');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('number');
    });

    it('should return a 404 error for an invalid user ID', async () => {
      const res = await chai.request(app).get('/user/invalid/balance');
      expect(res).to.have.status(404);
    });
  });
});