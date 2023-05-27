import fs from 'fs';
import Keyv from 'keyv';

import { ENV } from './config';

// check if folder data exist
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data');
}

export const keyv = new Keyv(ENV.DATABASE_URL);
