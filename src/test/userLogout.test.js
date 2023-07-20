import chai,{ expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import userMock from './mock/userMocks'

chai.use(chaiHttp);
let signinToken = ''
before((done) => {
  chai.request(app)
  .post('/api/v1/auth/login')
  .send({
    email:"Josh@phantom.com",
    password:"admin"
  })
  .end((err, res) => {
    signinToken = res.body.Token 
    done()
  });
});
describe('/GET Logout user', () => {
  it('it should check if token provided is correct', (done) => {
    
    chai.request(app)
        .get('/api/v1/auth/logout')
        .set('x-access-token', userMock.token.admin)
        .end((err, res) => {
          console.log(res.body)
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Logout successfully')

            done();
        });
  });
  it('it should check if the user is already logged out', (done) => {
    
    chai.request(app)
        .get('/api/v1/auth/logout')
        .set('x-access-token', userMock.token.admin)
        .end((err, res) => {
          console.log(res.body)
            expect(res.statusCode).to.equal(409);
            expect(res.body.message).to.equal('you are not logged in')

            done();
        });
  });
  it('it should check if token provided is incorrect', (done) => {
   
    chai.request(app)
        .get('/api/v1/auth/logout')
        .set('x-access-token', userMock.token.NotCorrect)
        .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.message).to.equal('Invalid token')
            done();
        });
});

});