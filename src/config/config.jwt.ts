import JWTConfig from '@/classes/JwtConfig';
import fs from 'fs';

export const getSecretByKey = (): Buffer => {
  const keyLocation = process.env.JWT_KEY_LOCATION || '/data/private_key.pem';
  const file = fs.readFileSync(keyLocation);
  return file;
};

export default {
  isJwtEnabled : process.env.JWT_ENABLE === 'true' || false,
  mode: process.env.JWT_MODE || 'direct',
  secret : process.env.JWT_MODE === 'key' ? 
    getSecretByKey() : 
    process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  algorithm: 'RS256'  
} as JWTConfig;