import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";
import userMock from './mock/userMocks'
import registerMock from './mock/registerMocks'

chai.use(chaiHttp);

describe("Phantom API test register", () => {
  it("Should not create new user if email aready exists", done => {
    chai
      .request(app)
      .post("/api/v1/auth/register")
      .set("Authorization", userMock.token.admin)
      .send(registerMock.existingUser)
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        expect(res).to.have.status(409);
        done();
      })
  });

  it("Should not create new user if no name is provided ", done => {
    chai
      .request(app)
      .post("/api/v1/auth/register")
      .set("Authorization", userMock.token.admin)
      .send(registerMock.nameNotFound)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("name is required")
        done();
      })
  });
});
