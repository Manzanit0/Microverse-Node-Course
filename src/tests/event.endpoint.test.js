//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let event = require('../models/event.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
/*
  * Test the /GET route
  */
  describe('/GET event', () => {
      it('it should GET all the events', (done) => {
        chai.request(server)
            .get('/book')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});
