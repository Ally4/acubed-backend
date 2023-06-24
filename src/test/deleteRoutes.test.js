import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';


chai.use(chaiHttp);
const requester=()=>chai.request(app);
const prefix='/api/v1/routes';

const operatorToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyQGdtYWlsLmNvbSIsInJvbGUiOiJvcGVyYXRvciIsImlhdCI6MTYwNDMyMzY1NCwiZXhwIjoxNjA0OTI4NDU0fQ.X0GHtra5nUx1wemARs89KfgWzzKl5qRT93t-Xy50iQs';
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikpvc2hAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAyNzY0NDkwLCJleHAiOjE2MDMzNjkyOTB9.Jctf3hUMNigF19-ShwOg6_4p1gAwgD97E7PUHwdtNd';

describe('delete routes',()=>{
    it('it should delete route', (done) => {
        requester()
              .post(prefix)
              .set("x-access-token", operatorToken)
              .end((err, res) => {
                  expect(res).to.have.status([401]);
                  done();
              });
      });

      it('it should not delete route with fake token', (done) => {
        requester()
              .post(prefix)
              .set("x-access-token", fakeToken)
              .end((err, res) => {
                  expect(res).to.have.status([401]);
                  done();
              });
      });
      it('should not delete route if invalid id', (done) => {
        chai
          .request(app)
          .delete('/api/v1/routes/yuu')
          .set('x-access-token', operatorToken)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res).to.have.property('status');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
})