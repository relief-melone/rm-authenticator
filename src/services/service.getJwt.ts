import jwt from 'jsonwebtoken';
import ConfigJwt from '@/config/config.jwt';
import fs from 'fs';

export const signWithPrivateKey = (user: Record<string, any>, configJwt = ConfigJwt): string => {
  return jwt.sign(user, configJwt.secret, {
    expiresIn: configJwt.expiresIn,
    algorithm: configJwt.algorithm
  });
};

export const signWithSecret = (user: Record<string,any>,  configJwt = ConfigJwt): string => {
  return jwt.sign(user, configJwt.secret,{
    expiresIn: configJwt.expiresIn
  });
};

export default (user: Record<string,any>, configJwt = ConfigJwt): string => {
  if(!configJwt.isJwtEnabled) throw 'JWT has been disabled';
  if(!configJwt.secret) throw 'No Secret has been defined';

  const token = ConfigJwt.mode === 'direct' ?
    signWithSecret(user, configJwt) :
    signWithPrivateKey(user, configJwt);


  return token;
};