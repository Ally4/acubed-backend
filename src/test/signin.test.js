import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
describe('Sign in route', () => {
  it('should not logIn if the wrong email is provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'josb@gmail.com',
        password: 'admin',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equals('Wrong email, please enter the registered email.');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('should not login if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'email is not allowed to be empty',
        password: 'admin',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equals('email must be a valid email');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('Log in the user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Josh@gmail.com',
        password: 'admin',
      })
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equals('logged In successfull');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
  it('checkUser password is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Josh@gmail.com',
        password: 'admin2',
      })
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equals('Wrong password, Please enter the registered password.');
        done();
      });
  });
  it('checkUser password is not provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Josh@gmail.com',
        password: '',
      })
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equals('password is not allowed to be empty');
        done();
      });
  });
});
