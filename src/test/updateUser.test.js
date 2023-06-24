import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);
const requester=()=>chai.request(app);

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGxAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAzMzc3MDk5LCJleHAiOjE2MDM5ODE4OTl9.rEtLJMojuQPCLxyDTII1EXZQwvM--FK24lPzAmwHOsw';
const validRole='operator';
const invalidRole='op';
const emptyRole=' ';

describe('update user by id',()=>{
    it('update user with valid role', (done) => {
        chai
          .request(app)
          .patch('/api/v1/users/1')
          .set('x-access-token', adminToken)
          .send(validRole)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res).to.have.property('status');
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql(401);
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
      it(' should not update user with empty role', (done) => {
        chai
          .request(app)
          .patch('/api/v1/users/1')
          .set('x-access-token', adminToken)
          .send(emptyRole)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res).to.have.property('status');
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql(401);
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
      it(' should not update user with invalid role', (done) => {
        chai
          .request(app)
          .patch('/api/v1/users/1')
          .set('x-access-token', adminToken)
          .send(invalidRole)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res).to.have.property('status');
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql(401);
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
})