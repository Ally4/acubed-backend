import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import busClassify from '../utils/generateDefaultRole'
import message from '../utils/messageMocks'

chai.use(chaiHttp);

describe('PHANTOM - TEST UTILS', () => {
    it('it should return bus category', () => {
        let largeVal = 120
        expect(busClassify.classifyBus(largeVal)).to.be.a('string').eq('large')
    });

    it('it should return signup message', () => {
        let email = '1', password = '3'
        expect(message.signupEmail(email, password)).to.be.a('string')
    });
});
