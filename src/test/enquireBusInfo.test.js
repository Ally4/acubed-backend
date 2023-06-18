import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from "../app";


chai.use(chaiHttp);

const busId = 2
describe(`/GET - Enquire Bus's Info`, () => {

    it('should return an object', (done) => {
        chai.request(app)
            .get('/api/v1/buses/' + busId)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.have.property("findBus")
                done()
            })
    });
})

