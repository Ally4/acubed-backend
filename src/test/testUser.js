import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";
import userMock from './mock/userMocks'

chai.use(chaiHttp);

describe('Phantom API - User', () => {
    it('It should check if email exist', (done) => {
        chai.request(app)
            .patch('/api/v1/auth/updateuser')
            .send(userMock.NotExistEmail)
            .set("Authorization", userMock.token.admin)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('It should update role', (done) => {
        chai.request(app)
            .patch('/api/v1/auth/updateuser')
            .send(userMock.rightInput)
            .set("Authorization", userMock.token.admin)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('It should return error if email is not valid', (done) => {
        chai.request(app)
            .patch('/api/v1/auth/updateuser')
            .set("Authorization", userMock.token.admin)
            .send(userMock.InvalidEmail)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('It should return error if email is not provided', (done) => {
        chai.request(app)
            .patch('/api/v1/auth/updateuser')
            .set("Authorization", userMock.token.admin)
            .send(userMock.requiredEmail)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('It should return error if role is not provided', (done) => {
        chai.request(app)
            .patch('/api/v1/auth/updateuser')
            .set("Authorization", userMock.token.admin)
            .send(userMock.requiredRole)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

    it('It should return error if role not included', (done) => {
        chai.request(app)
            .patch('/api/v1/auth/updateuser')
            .set("Authorization", userMock.token.admin)
            .send(userMock.roleNotIncluded)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
    });

});
