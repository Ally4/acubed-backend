import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { describe, it } from 'mocha';
import token from './mock/userMocks'
import data from './mock/updateData';
import app from '../app';
import user from './mock/data';
dotenv.config();
chai.use(chaiHttp);
const prefix = '/api/v1/auth/updateProfile';

describe(' Test update profile', () => {
  it('Should not update user if firstname is empty ', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', token.token.admin)
      .send(data.firstnameIsEmpty)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  
  it('Should update user ', (done) => {
    chai
      .request(app)
      .patch(prefix)
      .set('x-access-token', token.token.admin)
      .send(data.updatedInfo)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
