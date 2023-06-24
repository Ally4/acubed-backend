import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import bus from './mock/busData';
import user from './mock/data';
import { encode } from '../utils/jwt';

chai.use(chaiHttp);
const adminToken = encode(user[3]);
const nonAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydWNlQGdtYWlsLmNvbSIsInJvbGUiOiJkcml2ZXIiLCJpYXQiOjE2MDMzNzcyNzAsImV4cCI6MTYwMzk4MjA3MH0.UCLiQvmKRhD8_iamHOnjMLgVtxs9Z1e1ixVgc0cVVUA';

describe(' delete Buses', () => {

it('delete buses', (done) => {
    chai
      .request(app)
      .delete('/api/v1/buses/1')
      .set('x-access-token', adminToken)
      .set('request.params', 1)
      .send({
        busId: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('it should not delete buses if non admin token', (done) => {
    chai.request(app)
    .post('/api/v1/buses')
    .set('x-access-token', nonAdminToken)
    .end((err, res) => {
        expect(res).to.have.status([401]);
        expect(res).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('should not delete bus if it does not exist in the system', (done) => {
    chai
      .request(app)
      .delete('/api/v1/buses/101')
      .set('x-access-token', adminToken)
      .set('request.params', 101)
      .send({
        busId: 101,
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('it should not delete buses if non admin token', (done) => {
    chai.request(app)
    .post('/api/v1/buses')
    .set('x-access-token', nonAdminToken)
    .end((err, res) => {
        expect(res).to.have.status([401]);
        expect(res).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('should not delete bus if invalid id', (done) => {
    chai
      .request(app)
      .delete('/api/v1/buses/yuu')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
})