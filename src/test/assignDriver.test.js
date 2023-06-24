import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import userMock from './mock/userMock';
import app from "../app";


chai.use(chaiHttp);
const token =userMock.token.operator;
const busId=2;
// const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiSm9zaDEyM0BnbWFpbC5jb20iLCJyb2xlIjoib3BlcmF0b3IifSwiaWF0IjoxNjA5ODIzNzgyLCJleHAiOjE2MDk5OTY1ODJ9.ZkOOoBAntxjVEkHsUrMWJim6eHpLFSjfbXZDgW7vDu4'
describe('TEST BUS ASSIGNMENT', () => {
    it('it should not assign driver due to validation', (done) => {
        
        chai.request(app)
            .patch('/api/v1/assignDriver/' + busId)
            .set("x-access-token", token)
            .send({"email": "mugemagmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.message).to.equal('provide valid email')
                done();
            });
    });

    it('it should not assign driver due to email not found', (done) => {
        
        chai.request(app)
            .patch('/api/v1/assignDriver/' + busId)
            .set("x-access-token", token)
            .send({"email": "mugem8xy@gmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.message).to.equal('Email is not found')
                done();
            });
    });

    it('it should not assign driver due to incorrect role', (done) => {
        
        chai.request(app)
            .patch('/api/v1/assignDriver/' + busId)
            .set("x-access-token", token)
            .send({"email": "Josh@gmail.com"})
            .end((err, res) => {                
                expect(res.statusCode).to.equal(401);
                expect(res.body.message).to.equal('user is not driver')
                done();
            });
    });

    
    it('it should  assign driver', (done) => {
        let Id=2
        chai.request(app)
            .patch('/api/v1/assignDriver/' + Id)
            .set("x-access-token", token)
            .send({"email": "mugema8@gmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal('assign successfully')
                done();
            });
    });

    it('it should not assign driver if driver is already assigned', (done) => {
    
        chai.request(app)
            .patch('/api/v1/assignDriver/' + busId)
            .set("x-access-token", token)
            .send({"email": "mugema8@gmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body.message).to.equal('Driver is already assigned')
                done();
            });
    });
    
    
    it('it should not assign driver if bus is already assigned', (done) => {
    let Id=1
        chai.request(app)
            .patch('/api/v1/assignDriver/' + Id)
            .set("x-access-token", token)
            .send({"email": "mugema8@gmail.com"})
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                // expect(res.body.message).to.equal('Driver is already assigned')
                done();
            });
    });

    it('it should not unassign driver if driver is not assigned', (done) => {
        let Id=1
            chai.request(app)
                .patch('/api/v1/unassignDriver/' + Id)
                .set("x-access-token", token)
                .send({"email": "mugema@gmail.com"})
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body.message).to.equal('Email is not found')
                    
                    done();
                });
        });

        it('it should unassign driver', (done) => {
            let Id=2
                chai.request(app)
                    .patch('/api/v1/unassignDriver/' + Id)
                    .set("x-access-token", token)
                    .send({"email": "mugema8@gmail.com"})
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body.message).to.equal('unassign successfully');
                        done();
                    });
            });

            it('it should not retrieve assigned buses when page not found', (done) => {
                chai.request(app)
                    .get('/api/v1/assignedbuses')
                    .set("x-access-token", token)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(404);
                        expect(res.body.message).to.equal('page not found');
                        done();
                    });
            });


})
