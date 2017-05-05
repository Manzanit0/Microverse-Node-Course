/**
 * Change to testing enviroment.
 */
process.env.NODE_ENV = 'test';

const server = require('../app.js'),
    userModel = require('../models/user.model.js'),
    db = require('../config/db.config.js');

/**
 * libraries
 */
const assert = require('assert'),
        chai = require('chai'),
    chaiHttp = require('chai-http'),
    mongoose = require('mongoose');

/**
 * Setup chai
 */
const expect = chai.expect;
chai.use(chaiHttp);

/**
 * Import user model
 */
const userSchema = require('../models/user.model');
const User = mongoose.model('user', userSchema);


describe('user API endpoint', () => {

    // Insert an user record before the tests.
    before( (done) => {
        let newUser = new User({
          username: 'test+username',
          password: 'test+pwd',
          email: 'test@email.net',
        });

        newUser.save()
            .then(result => {
                id = result.id;
            })
            .catch(error => {
                console.log(error);
            });

            done();
    });

    // Empty the DB user table once tests are over.
    after((done) => {
      User.collection.drop();
      done();
    });

    describe('POST User', () => {
        it('POST User receives an 201 status', (done) => {
            chai.request(server)
                .post('/users')
                .send({id: 1112233, username: 'username1', password: 'pwd', email: 'e@ma.il'})
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
            });
        });

        it('POST User return value is the same as the sent', (done) => {
            const sentData = {id: 1112233, username: 'username1', password: 'pwd', email: 'e@ma.il'};
            chai.request(server)
                .post('/users')
                .send(sentData)
                .end((err, res) => {
                    expect(res.body.data).to.deep.equals(sentData);
                    done();
            });
        });

    });

    describe('GET User', () => {
        it('GET User by username recieves a 200 status', (done) => {
            chai.request(server)
                .get('/users/test+username')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});
