import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';


chai.use(chaiHttp);


const operatorToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyQGdtYWlsLmNvbSIsInJvbGUiOiJvcGVyYXRvciIsImlhdCI6MTYwNDMyMzY1NCwiZXhwIjoxNjA0OTI4NDU0fQ.X0GHtra5nUx1wemARs89KfgWzzKl5qRT93t-Xy50iQs';
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikpvc2hAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAyNzY0NDkwLCJleHAiOjE2MDMzNjkyOTB9.Jctf3hUMNigF19-ShwOg6_4p1gAwgD97E7PUHwdtNd';

describe('update route by id',()=>{
   
    it('update route with valid id', (done) => {
        chai
          .request(app)
          .patch('/api/v1/users/1')
          .set('x-access-token', operatorToken)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res).to.have.property('status');
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql(401);
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
      it('should not update route with invalid id', (done) => {
        chai
          .request(app)
          .patch('/api/v1/users/1uj')
          .set('x-access-token', operatorToken)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res).to.have.property('status');
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.eql(401);
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
      it('should not update route with fake token', (done) => {
        chai
          .request(app)
          .patch('/api/v1/users/1')
          .set('x-access-token', fakeToken)
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