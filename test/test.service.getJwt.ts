import serviceGetJwt from '@/services/service.getJwt';
import JWTConfig from '@/classes/JwtConfig';

import jwt from 'jsonwebtoken';
import chai, { expect } from 'chai';
import chaiExclude from 'chai-exclude';

import fs from 'fs';

chai.use(chaiExclude);

describe('service.getJwt', () => {
  const defaultSecretConfig: JWTConfig = {
    isJwtEnabled: true,
    secret: 'superSecret',
    expiresIn: '1h',
    algorithm: 'RS256',
    mode: 'direct'
  };

  const defaultKeyFileConfig: JWTConfig = {
    isJwtEnabled: true,
    secret: fs.readFileSync(`${__dirname}/../../test/testKeys/private_key.pem`),
    expiresIn: '1h',
    algorithm: 'RS256',
    mode: 'key'
  };  

  it('will create a verifiable token from a secret', () => {
    // Execute
    const user = { displayName: 'Mr. Eco', email: 'mr.eco@lonelyIsland.com' };
    const token = serviceGetJwt(user, defaultSecretConfig);

    // Assert
    expect(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())).excluding(['exp','iat']).to.deep.equal(user);
    expect(() => { jwt.verify(token, defaultSecretConfig.secret); }).not.to.throw;
  });

  it('will create a verifiable token from a keyFile', () => {
    // Execute
    const user = { displayName: 'Mr. Eco', email: 'mr.eco@lonelyIsland.com' };
    const token = serviceGetJwt(user, defaultKeyFileConfig);
    const pubKey = fs.readFileSync(`${__dirname}/../../test/testKeys/public_key.pem`);

    // Assert
    expect(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())).excluding(['exp','iat']).to.deep.equal(user);
    expect(() => { jwt.verify(token, pubKey, { algorithms: ['RS256'] }); }).not.to.throw;
  });
});