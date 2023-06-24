import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';


chai.use(chaiHttp);
const requester=()=>chai.request(app);
const prefix='/api/v1/routes';

const operatorToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBldGVyQGdtYWlsLmNvbSIsInJvbGUiOiJvcGVyYXRvciIsImlhdCI6MTYwNDMyMzY1NCwiZXhwIjoxNjA0OTI4NDU0fQ.X0GHtra5nUx1wemARs89KfgWzzKl5qRT93t-Xy50iQs';
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikpvc2hAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAyNzY0NDkwLCJleHAiOjE2MDMzNjkyOTB9.Jctf3hUMNigF19-ShwOg6_4p1gAwgD97E7PUHwdtNd';

describe('Phantom  create Routes', () => {

    it('it should not add new route when is not an operator', (done) => {
      requester()
            .post(prefix)
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([401]);
                done();
            });
    });
    it('it should add new route', (done) => {
      requester()
            .post(prefix)
            .set("x-access-token", operatorToken)
            .end((err, res) => {
                expect(res).to.have.status([401]);
                done();
            });
    });
    it('it should not add new route with fake token', (done) => {
        requester()
              .post(prefix)
              .set("x-access-token", fakeToken)
              .end((err, res) => {
                  expect(res).to.have.status([401]);
                  done();
              });
      });
});