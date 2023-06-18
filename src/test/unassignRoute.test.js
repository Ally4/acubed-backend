import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import userMock from './mock/userMocks'
import app from "../app";

chai.use(chaiHttp);

describe('PHANTOM API - TEST ASSIGNMENT', () => {
    it("should return object if Bus unassigned from route successfully", (done) => {
        chai
            .request(app)
            .patch("/api/v1/buses/unassignroutes/2")
            .set("Authorization", userMock.token.admin)
            .send({ routeID: 305 })
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                done();
        });
    });

    it("should return error If the route was not usually assigned to bus", (done) => {
        chai
            .request(app)
            .patch("/api/v1/buses/assignroutes/2")
            .set("Authorization", userMock.token.operator)
            .send({ routeID: 495 })
            .end((err, res) => {
               expect(res.statusCode).to.equal(404);
               expect(res.body).to.be.an("object");
               done();
        });
    });
})
