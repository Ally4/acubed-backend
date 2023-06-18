import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";
import userMock from './mock/userMocks'

chai.use(chaiHttp);

const busId = 2
describe('PHANTOM API - TEST ASSIGNMENT', () => {

    it('it should not assign driver due to validation', (done) => {
        chai.request(app)
            .patch('/api/v1/buses/assigndriver/' + busId)
            .set("Authorization", userMock.token.operator)
            .send({ "email": "happykagmail.com" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.message).to.equals("provide valid email");
                done();
            });
    });

    it('it should not assign driver due to email not found', (done) => {

        chai.request(app)
            .patch(`/api/v1/buses/assigndriver/${busId}`)
            .set("Authorization", userMock.token.operator)
            .send({ "email": "happyka@gmail.com" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.message).to.equals("Email is not found");
                done();
            });
    });

    it('it should not assign driver due to incorrect role', (done) => {
        chai.request(app)
            .patch('/api/v1/buses/assigndriver/' + busId)
            .set("Authorization", userMock.token.operator)
            .send({ "email": "emmanuelnkubito2@gmail.com" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body.message).to.equals("user is not driver");
                done();
            });
    });


    it('it should  assign driver', (done) => {
        chai.request(app)
            .patch('/api/v1/buses/assigndriver/' + busId)
            .set("Authorization", userMock.token.operator)
            .send({ "email": "happyka52@gmail.com" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('it should not assign driver if driver is already assigned', (done) => {
        chai.request(app)
            .patch('/api/v1/buses/assigndriver/' + busId)
            .set("Authorization", userMock.token.operator)
            .send({ "email": "happyka52@gmail.com" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body).to.have.a.property("message");
                done();
            });
    });

    it('it should not assign driver if bus is already assigned', (done) => {
        let Id = 2
        chai.request(app)
            .patch('/api/v1/buses/assigndriver/' + Id)
            .set("Authorization", userMock.token.operator)
            .send({ "email": "karigirwa@gmail.com" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body).to.have.a.property("message");
                done();
            });
    });

    it('it should not unassign driver if driver is not assigned', (done) => {
        let Id = 1
        chai.request(app)
            .patch('/api/v1/buses/unassigndriver/' + Id)
            .set("Authorization", userMock.token.operator)
            .send({ "email": "karigirwa@gmail.com" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body.message).to.equals("user is not assigned to bus");
                done();
            });
    });

    it('it should unassign driver', (done) => {
        let Id = 1
        chai.request(app)
            .patch('/api/v1/buses/unassigndriver/' + Id)
            .set("Authorization", userMock.token.operator)
            .send({ "email": "happyka52@gmail.com" })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.a.property("bus");
                done();
            });
    });

    it('it should not retrieve assigned buses when page not found', (done) => {
        chai.request(app)
            .get('/api/v1/buses/assignedbuses?page=4&limit=10')
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.message).to.equals("page not found");
                done();
            });
    });

    it('it should not retrieve assigned buses when limit is undefined', (done) => {
        chai.request(app)
            .get('/api/v1/buses/assignedbuses?page=1&limit=undefined')
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.body.message).to.equals("Error occurred while retrieving buses");
                done();
            });
    });

    it('it should retrieve assigned buses', (done) => {
        chai.request(app)
            .get('/api/v1/buses/assignedbuses')
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.a.property('rows')
                done();
            });
    });

})
