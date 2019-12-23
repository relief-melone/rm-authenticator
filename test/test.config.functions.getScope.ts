import { getScope } from '../src/config/functions/getScope';
import { Provider } from '../src/classes/Provider';
import { expect } from 'chai';

describe('getScope', () => {
  it('will return the correct scope if no env var has been set', () => {
    const env = {};
    expect(getScope(Provider.google, ['email', 'profile'], env)).to.deep.equal([
      'email',
      'profile'
    ]);
  });

  it('will return the profile from the env var if it has been set', () => {
    const env = { FACEBOOK_SCOPE: 'openid;email;profile' };
    expect(
      getScope(Provider.facebook, ['email', 'profile'], env)
    ).to.deep.equal(['openid', 'email', 'profile']);
  });
});
