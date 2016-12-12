import pathMod from 'path';
import envMod from 'environment-vars';

const path = pathMod.join(__dirname, '../');
const env = envMod(path, '.env');

export default {
  DB_USER: env.get('DB_USER'),
  DB_PASS: env.get('DB_PASS'),
  DB_HOST: env.get('DB_HOST'),
  DATABASE: env.get('DATABASE'),
  ADMIN_NAME: env.get('ADMIN_NAME'),
  ADMIN_EMAIL: env.get('ADMIN_EMAIL'),
  ADMIN_PASSWORD: env.get('ADMIN_PASSWORD'),
  SALT: env.get('SALT'),
};
