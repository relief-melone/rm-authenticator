import { expect } from 'chai';
import { getClientInfo } from '../src/config/functions/getClient';

describe('getClientInfo', () => {
  it('will throw an error if no ClientID has been provided', () => {
    const env = {};
    expect(() => getClientInfo('google', 'id', env)).to.throw(
      'GOOGLE_CLIENT_ID has to be set!'
    );
  });

  it('will throw if no Client Secret has been set', () => {
    const env = {};
    expect(() => getClientInfo('google', 'secret', env)).to.throw(
      'GOOGLE_CLIENT_SECRET has to be set!'
    );
  });

  it('will return the ClientId if it has been set properly', () => {
    const env = {
      FACEBOOK_CLIENT_ID: '030818123520021'
    };
    expect(getClientInfo('facebook', 'id', env)).to.equal(
      env.FACEBOOK_CLIENT_ID
    );
  });

  it('will return the ClientSecret if it has been set properly', () => {
    const env = {
      FACEBOOK_CLIENT_SECRET: '030818123520021'
    };
    expect(getClientInfo('facebook', 'secret', env)).to.equal(
      env.FACEBOOK_CLIENT_SECRET
    );
  });
});
