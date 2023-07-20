import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);
describe('getting buses in routes', () => {
  it('validate origin', (done) => {
    chai.request(app)
      .get('/api/v1/bus/routes?origin=kgl&destination=Kimironko')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property('status');
        expect(res.body.message).to.equal('origin should be not less than 4 characters');
        done();
      });
  });

  it('validate destination', (done) => {
    chai.request(app)
      .get('/api/v1/bus/routes?origin=Nyabugogo&destination=')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('"destination" is not allowed to be empty');
        done();
      });
  });

  it('get buses successfully', (done) => {
    chai.request(app)
      .get('/api/v1/bus/routes?origin=down-town&destination=Kabeza')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // expect(res.body.status).to.equals('200');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('return error if route is not found', (done) => {
    chai.request(app)
      .get('/api/v1/bus/routes?origin=kanombe&destination=kicukiro')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equals("this route doesn't exist in the system");
        done();
      });
  });
});
