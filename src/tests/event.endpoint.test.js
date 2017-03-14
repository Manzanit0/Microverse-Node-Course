require('../app.js');

const assert = require('assert'),
chai = require('chai'),
chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

const util = require('util');

describe('Event API endpoint', () => {

    describe('GET all events', () => {
        it('GET all event should have a 200 status', (done) => { // <= Pass in done callback
            chai.request('http://localhost:3000')
                .get('/event')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
            });
        });

        it('GET all event should have expected structure', (done) => { // <= Pass in done callback
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

    describe('GET event by Id', () => {
        it('GET event by Id should have a 200 status', (done) => {
            chai.request('http://localhost:3000')
                .get('/event/12345')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
            });
        });

        it('GET event by wrong Id should not have a 200 status', (done) => {
            chai.request('http://localhost:3000')
                .get('/event/666')
                .end((err, res) => {
                    expect(res).to.not.have.status(200);
                    done();
            });
        });

        it('GET event by Id should be a single event', (done) => {
            chai.request('http://localhost:3000')
                .get('/event/12345')
                .end((err, res) => {
                    expect(res).to.be.an('object');
                    done();
            });
        });

    });

    describe('POST event', () => {
        it('POST event receives an 201 status', (done) => {
            chai.request('http://localhost:3000')
                .post('/event')
                .send({id: 987654321, title: 'ola k ase', descripcion: 'pir pir pir', fecha: '12/01/3078'})
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
            });
        });

        it('POST event return value is the same as the sent', (done) => {
            const sentData = {id: 987654321, title: 'ola k ase', descripcion: 'pir pir pir', fecha: '12/01/3078'};
            chai.request('http://localhost:3000')
                .post('/event')
                .send(sentData)
                .end((err, res) => {
                    expect(res.body.data).to.deep.equals(sentData);
                    done();
            });
        });

    });

    describe('PUT event by Id', () => {
        it('PUT event receives an 201 status', (done) => {
            chai.request('http://localhost:3000')
                .post('/event')
                .send({id: 987654321, title: 'ola k ase 2', descripcion: '', fecha: '01/11/1234'})
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
            });
        });

        it('PUT event updates the object and its not equals', (done) => {
            const sentData = {id: 12345, title: 'ola k ase 2', descripcion: '', fecha: '01/11/1234'};
            chai.request('http://localhost:3000')
            .post('/event')
            .send(sentData)
            .end((err, res) => {
                chai.request('http://localhost:3000')
                    .put('/event/12345')
                    .send({id: 12345, title: 'titulo cambiado', descripcion: '', fecha: '01/11/1234'})
                    .end((err, res) => {
                        expect(res.body.data).to.not.deep.equals(sentData);
                        done();
                });
            });
        });
    });

    describe('DELETE event by Id', () => {
        it('DELETE event receives an 200 status', (done) => {
            chai.request('http://localhost:3000')
                .delete('/event/12345')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
            });
        });

        it('The deleted event does no longer exist. Status = 204', (done) => {
            chai.request('http://localhost:3000')
                .delete('/event/12345')
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
            });
        });
    });
});
