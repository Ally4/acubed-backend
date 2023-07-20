import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_KEY || 'jjjjjjjjjjjj';

export const decode = (token) => jwt.verify(token, secret);

export const encode = (payload) => jwt.sign({ payload }, secret, { expiresIn: '1h' });

export const encodeExpire = (payload) => jwt.sign({ payload }, secret, { expiresIn: '0.0001s' });
