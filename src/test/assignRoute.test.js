import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import userMock from './mock/userMocks'
import app from "../app";

chai.use(chaiHttp);
describe('PHANTOM API - TEST ASSIGNMENT', () => {

    it('should return object if Bus assigned route successfully', (done) => {
      chai.request(app)
        .patch('/api/v1/buses/assignroutes/1')
        .set("Authorization", userMock.token.operator)
        .send({"routeID":305})
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object")
          done();
        });
    });

    it("should return error If routeId not found", (done) => {
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
