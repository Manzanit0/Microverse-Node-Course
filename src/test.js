const assert = require('assert'),
    chai = require('chai'),
    chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Event API endpoint', function() {
    it('GET all event should have a 200 status', function (done) { // <= Pass in done callback
        chai.request('http://localhost:3000')
            .get('/event')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('GET all event should have expected structure', function (done) { // <= Pass in done callback
        chai.request('http://localhost:3000')
            .get('/event')
            .end((err, res) => {
                expect(res.body.result).to.equal('ok');
                expect(res.body.code).to.equal(200);
                expect(res.body).to.have.property('data');
                done();
            });
    });
});