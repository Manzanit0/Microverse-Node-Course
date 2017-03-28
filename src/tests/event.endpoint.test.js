//require('../app.js');

const assert = require('assert'),
        chai = require('chai'),
    chaiHttp = require('chai-http'),
    mongoose = require('mongoose');

const expect = chai.expect;
chai.use(chaiHttp);

/**
 * Import event model
 */
const eventSchema = require('../models/event.model');
const Event = mongoose.model('Event', eventSchema);

// Use native promises
mongoose.Promise = global.Promise;

describe('Event API endpoint', () => {

    //TODO: ¿Esto debería tomarse del db.config.js?
    const serverUrl = 'http://localhost:3000';

    before( () => {
        let event = new Event({
          title: 'title',
          description: 'description',
          date: '01/01/1990',
        });

            console.log('hila');
        event.save()
            .then(result =>{
                console.log(result.data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    after( () => {
        //TODO: borrado de los datos de test en la BD.
    });

    describe('GET all events', () => {
        it('GET all event should have a 200 status', (done) => { // <= Pass in done callback
            chai.request('serverUrl')
                .get('/event')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
            });
        });

        it('GET all event should have expected structure', (done) => { // <= Pass in done callback
            chai.request(serverUrl)
                .get('/event')
                .end((err, res) => {
                    expect(res.body.result).to.equal('ok');
                    expect(res.body.code).to.equal(200);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('data');
                    done();
            });
        });
    });

    describe('GET event by Id', () => {
        it('GET event by Id should have a 200 status', (done) => {
            chai.request(serverUrl)
                .get('/event/58daa94844e08d183e0ef5a6')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
            });
        });

        it('GET event by wrong Id should not have a 200 status', (done) => {
            chai.request(serverUrl)
                .get('/event/666')
                .end((err, res) => {
                    expect(res).to.not.have.status(200);
                    done();
            });
        });

        it('GET event by Id should be a single event', (done) => {
            chai.request(serverUrl)
                .get('/event/12345')
                .end((err, res) => {
                    expect(res).to.be.an('object');
                    done();
            });
        });

    });

    describe('POST event', () => {
        it('POST event receives an 201 status', (done) => {
            chai.request(serverUrl)
                .post('/event')
                .send({id: 987654321, title: 'ola k ase', descripcion: 'pir pir pir', fecha: '12/01/3078'})
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
            });
        });

        it('POST event return value is the same as the sent', (done) => {
            const sentData = {id: 987654321, title: 'ola k ase', descripcion: 'pir pir pir', fecha: '12/01/3078'};
            chai.request(serverUrl)
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
            chai.request(serverUrl)
                .put('/event/58daa94844e08d183e0ef5a6')
                .send({id: 987654321, title: 'ola k ase 2', descripcion: '', fecha: '01/11/1234'})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
            });
        });

        it('PUT event updates the object and its not equals', (done) => {
            const sentData = {id: 12345, title: 'ola k ase 2', descripcion: '', fecha: '01/11/1234'};
            chai.request(serverUrl)
            .post('/event')
            .send(sentData)
            .end((err, res) => {
                chai.request(serverUrl)
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
            chai.request(serverUrl)
                .delete('/event/58daa94844e08d183e0ef5a6')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
            });
        });

        it('The deleted event does no longer exist. Status = 204', (done) => {
            chai.request(serverUrl)
                .delete('/event/58daa94844e08d183e0ef5a6')
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
            });
        });
    });
});
