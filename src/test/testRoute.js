import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";
import userMock from './mock/userMocks'
import routeMock from './mock/routeMocks'

chai.use(chaiHttp);

describe('PHANTOM API - TEST ROUTE', () => {

    it('it should retrieve routes', (done) => {
        chai.request(app)
            .get('/api/v1/routes')
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.a.property('rows')
                done()
            });
    });

    it('it should not retrieve routes when page not found', (done) => {
        chai.request(app)
            .get('/api/v1/routes?page=2&limit=10')
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.have.a.property('message')
                done()
            });
    });

    it('it should not retrieve routes when limit is undefined', (done) => {
        chai.request(app)
            .get('/api/v1/routes?page=1&limit=undefined')
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.body).to.have.a.property('message')
                done()
            });
    });

    it('it should not add new route due to validation', (done) => {
        chai.request(app)
            .post('/api/v1/routes')
            .set("Authorization", userMock.token.operator)
            .send(routeMock.NotAddNewRoute)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.have.a.property('message')
                done()
            });
    });

    it('it should add new route', (done) => {
        chai.request(app)
            .post('/api/v1/routes')
            .set("Authorization", userMock.token.operator)
            .send(routeMock.AddNewRoute)
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.have.a.property('route')
                done()
            });
    });

    it('it should not get route by id when id is not found', (done) => {
        let id = '2323232'
        chai.request(app)
            .get('/api/v1/routes/' + id)
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.have.a.property('message')
                done()
            });
    });

    it('it should not update route by duplicate routeID', (done) => {
        let id = 1
        chai.request(app)
            .patch('/api/v1/routes/' + id)
            .set("Authorization", userMock.token.operator)
            .send(routeMock.AddNewRoute)
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body).to.have.a.property('message')
                done()
            });
    });

    it('it should update route', (done) => {
        let id = 2
        chai.request(app)
            .patch('/api/v1/routes/' + id)
            .set("Authorization", userMock.token.operator)
            .send(routeMock.updateRoute)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.a.property('updatedRoute')
                done()
            });
    });

    it('it should not update route due to invalid id', (done) => {
        let id = '2frfrfrf'
        chai.request(app)
            .patch('/api/v1/routes/' + id)
            .set("Authorization", userMock.token.operator)
            .send(routeMock.NotUpdateRoute)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.body).to.have.a.property('message')
                done()
            });
    });

    it('it should not delete route due to wrong id', (done) => {
        let id = '2terere'
        chai.request(app)
            .delete('/api/v1/routes/' + id)
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(500);
                expect(res.body).to.have.a.property('message')
                done()
            });
    });

    it('it should delete route', (done) => {
        let id = 2
        chai.request(app)
            .delete('/api/v1/routes/' + id)
            .set("Authorization", userMock.token.operator)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.a.property('message')
                done()
            });
    });

})