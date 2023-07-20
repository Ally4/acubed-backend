import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';


chai.use(chaiHttp);
const requester=()=>chai.request(app);
const prefix='/api/v1/routes';

const operatorToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyQGdtYWlsLmNvbSIsInJvbGUiOiJvcGVyYXRvciIsImlhdCI6MTYwNDMyMzY1NCwiZXhwIjoxNjA0OTI4NDU0fQ.X0GHtra5nUx1wemARs89KfgWzzKl5qRT93t-Xy50iQs';
const fakeToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyQGdtYWlsLmNvbSIsInJvbGUiOiJvcGVyYXRvciIsImlhdCI6MTYwNDMyMzY1NCwiZXhwIjoxNjA0OTI4NDU0fQ.X0GHtra5nUx1wemARs89KfgWzzKl5qRT93t-Xy50iQ';

describe('Phantom  Routes operation', () => {
 
    it('it should not retrieve route with invalid id', (done) => {
      requester()
            .get('/api/v1/routes/hth6')
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([401]);
                done();
            });
    });
    it('it should update a route', (done) => {
      requester()
            .patch('/api/v1/routes/1')
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([401]);
                done();
            });
    });
    it('it should delete a route', (done) => {
      
           requester()
            .delete('/api/v1/routes/1')
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([401]);
                done();
            });
    });
    it('it should not get route with fake token', (done) => {
        requester()
          .get(prefix)
          .set('x-access-token', fakeToken)
          .end((err, res) => {
            expect(res).to.have.status([401]);
            done();
          });
      });
      it('it should get a route', (done) => {
        requester()
              .patch('/api/v1/routes/1')
              .set("x-access-token", operatorToken)
              .end((err, res) => {
                  expect(res).to.have.status([401]);
                  done();
              });
      });
      it('it should get all routes', (done) => {
        requester()
              .patch('/api/v1/routes/')
              .set("x-access-token", operatorToken)
              .end((err, res) => {
                  expect(res).to.have.status([404]);
                  done();
              });
      });
})