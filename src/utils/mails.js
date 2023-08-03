import dotenv from 'dotenv';
import mail from '@sendgrid/mail';
import { rawPassword } from './password';

dotenv.config();
mail.setApiKey(process.env.SENDGRID);

export const message = (email) => {
  const toSend = {
    to: email,
    from: 'el.ally741@gmail.com',
    subject: 'Reseting of the password on phantom platform',
    text: `Dear customer we are pleased to give you this password to access our platform ${rawPassword}`,
    html: `Dear customer we are pleased to give you this password to access our platform  ${rawPassword}`,
  };
  mail.send(toSend);
};
