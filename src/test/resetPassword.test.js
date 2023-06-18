import app from "../app";
import chai, { expect} from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import userMock from './mock/userMocks'

const TokenLink="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtbWFudWVsbmt1Yml0bzJAZ21haWwuY29tIiwiaWF0IjoxNjAzMzU1NDc5LCJleHAiOjE2MDU5NDc0Nzl9._4OsdrXHdHQ-bUEcxE97ZwsrLsM7ZdAgmRyLu1jprEY"
const expiredLink = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtbWFudWVsbmt1Yml0bzJAZ21haWwuY29tIiwiaWF0IjoxNjAzOTkyMDQ0LCJleHAiOjJ9.YPscQ4T5hjYtKj4zv8YVgx1622wDZBl5aZDQ50xglnk"

chai.use(chaiHttp);
describe('/PUT TEST RESETTING PASSWORD', () => {
    it('it should return error message if password does not provided', (done) => {
      chai.request(app)
      .put(`/api/v1/auth/resetPassword/${TokenLink}`)
      .send(userMock.confirmPassword)
      .end((err, res) => {
        expect(res.body.message).to.equals("password is required");
        expect(res).to.have.status(400);
        done();
        });
    });
     it('it should return error message if token expired', (done) => {
      chai.request(app)
      .put(`/api/v1/auth/resetPassword/${expiredLink}`)
      .send(userMock.validPasswords)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
        });
    });
    it('it should return error message if password is empty', (done) => {
        chai.request(app)
        .put(`/api/v1/auth/resetPassword/${TokenLink}`)
        .send(userMock.emptyPassword)
        .end((err, res) => {
          expect(res.body.message).to.equals("password is not allowed to be empty");
          expect(res).to.have.status(400);
          done();
          });
      });
      it('it should return error message if password is short', (done) => {
        chai.request(app)
        .put(`/api/v1/auth/resetPassword/${TokenLink}`)
        .send(userMock.shortPassword)
        .end((err, res) => {
          expect(res.body.message).to.equals("Password should have a minimum length of 5 characters");
          expect(res).to.have.status(400);
          done();
          });
      });

      it('it should return error message if confirm password is not provided', (done) => {
        chai.request(app)
        .put(`/api/v1/auth/resetPassword/${TokenLink}`)
        .send(userMock.correctInfo)
        .end((err, res) => {
          expect(res.body.message).to.equals("confirm password is required");
          expect(res).to.have.status(400);
          done();
          });
      });
      it('it should return error message if confirm password is empty', (done) => {
        chai.request(app)
        .put(`/api/v1/auth/resetPassword/${TokenLink}`)
        .send(userMock.emptyconfirmPassword)
        .end((err, res) => {
          expect(res.body.message).to.equals("Confirm Password should be matching to password provided");
          expect(res).to.have.status(400);
          done();
          });
      });
      it('it should return error message if confirm password does not match to provided password', (done) => {
        chai.request(app)
        .put(`/api/v1/auth/resetPassword/${TokenLink}`)
        .send(userMock.unMatchedPasswords)
        .end((err, res) => {
          expect(res.body.message).to.equals("Confirm Password should be matching to password provided");
          expect(res).to.have.status(400);
          done();
          });
      });
  });
