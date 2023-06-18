import app from "../app";
import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha'; 

chai.use(chaiHttp);
describe('/Get Buses in router', () => {
    it('should return error message if origin is incorrect', (done) => {
      chai.request(app)
          .get('/api/v1/buses/route?origin=kgl&destination=Kimironko')
          .end((err, res) => {
             expect(res).to.have.status(400),
             expect(res.body.message).to.equal("origin should be not less than 4 characters"),
             done()
          });
    });

    it('should return error message if destination is empty', (done) => {
      chai.request(app)
          .get('/api/v1/buses/route?origin=Nyabugogo&destination=')
          .end((err, res) => {
            expect(res).to.have.status(400),
            expect(res.body.message).to.equal("destination must not be empty"),
            done()
          });
    });

    it('should return message if buses in route found', (done)  => {
      chai.request(app)
          .get('/api/v1/buses/route?origin=Nyabugogo&destination=Kimironko')
          .end((err, res) => {
             expect(res).to.have.status(200),
             expect(res.body).to.be.an('object')
             done()
          });
    });

    it('should return error message if router is not exist', (done)  => {
      chai.request(app)
          .get('/api/v1/buses/route?origin=Nyabugogo&destination=Gikondo')
          .end((err, res) => {
             expect(res).to.have.status(401),
             expect(res.body.message).to.equals("this router doesn't exist in system"),
             done()
          });
    });

  })
