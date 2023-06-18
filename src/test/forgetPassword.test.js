import app from "../app";
import chai, { expect} from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import userMock from './mock/userMocks'


chai.use(chaiHttp);

  describe('/POST Password reset', () => {
    it('it should check if email provided is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/forgetPassword')
        .send(userMock.InvalidEmail)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal("provide valid email")
          done();
        });
    });
    it('it should check if email is provided', (done) => {
      chai.request(app)
        .post('/api/v1/auth/forgetPassword')
        .send(userMock.requiredEmail)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal("email is required")
          done();
        });
    });
    it('it should check if email provided is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/forgetPassword')
        .send(userMock.emptyEmail)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal("Email must not be empty")
          done();
        });
    });
        it('it should check if user is not registared', (done) => {
        chai.request(app)
          .post('/api/v1/auth/forgetPassword')
          .send(userMock.isNotRegistared)
          .end((err, res) => {
            expect(res.body.message).to.equal("email is not registered")
            expect(res.statusCode).to.equal(404);
            done();
          });
      });
      it('it should check if email send successfull', (done) => {
        chai.request(app)
          .post('/api/v1/auth/forgetPassword')
          .send(userMock.rightEmail)
          .end((err, res) => {
            expect(res.body.message).to.equal("Check in your email a link for changing password")
            expect(res.statusCode).to.equal(200);
            done();
          });
      });
  });
