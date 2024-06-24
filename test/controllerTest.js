// test/userController.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../app'); // Assuming app.js initializes and exports the Express app

chai.use(chaiHttp);

describe('User Controller', () => {
  describe('GET /getUser/:userId', () => {
    it('should return a user object when valid userId is provided', async () => {
      const userId = 'abc123'; // Replace with a valid user ID
      const res = await chai.request(app).get(`/getUser/${userId}`);
      
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id', userId);
      expect(res.body).to.have.property('name');
    });

    it('should return 404 error when user is not found', async () => {
      const userId = 'invalidUserId'; // Replace with an invalid user ID
      const res = await chai.request(app).get(`/getUser/${userId}`);

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error', 'User not found');
    });
  });
});
