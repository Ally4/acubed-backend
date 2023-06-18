import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";
import registerMock from './mock/registerMocks'
import userMock from './mock/userMocks'

chai.use(chaiHttp);

describe("Phantom API test update profile", () => {
  it("Should not update user if name is empty ", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth/updateProfile")
      .set("Authorization", userMock.token.admin)
      .send(registerMock.nameIsEmpty)
      .end((err,res)=>{
        expect(res).to.have.status(400);
        done();
      })
  }); 
  it("Should not update user if name is empty ", done=>{
    chai 
      .request(app)
      .patch("/api/v1/auth/updateProfile")
      .set("Authorization", userMock.token.admin)
      .send(registerMock.invalidEmail)
      .end((err,res)=>{
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal("You have to use a registered email in order to update your profile")
        done();
      })
  }); 
  });
