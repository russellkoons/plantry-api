const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('../app');

const should = chai.should();
chai.use(chaiHttp);

// Server Test

describe('API', function() {

  it('should 200 on GET requests', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
      });
  });
});