import Keyv from 'keyv';

export const keyv = new Keyv(process.env.DATABASE_URL);
