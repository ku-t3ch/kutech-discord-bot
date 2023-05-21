import fs from 'fs';
import Keyv from 'keyv';

// check if folder data exist
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data');
}

export const keyv = new Keyv(process.env.DATABASE_URL);
