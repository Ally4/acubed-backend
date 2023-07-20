import bcrypt from 'bcrypt';

export let rawPassword = '';
const possible = 'ZXCVBNMASDFGHJKLQWERTYUIOPzxcvbnmasdfghjklqwertyuiop1234567890';

for (let i = 0; i < 10; i++) {
  rawPassword += possible.charAt(Math.floor(Math.random() * possible.length));
}


export const password = bcrypt.hashSync(rawPassword, 10);
