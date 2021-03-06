import { getEnabled } from '../src/config/functions/getEnabled';
import { expect } from 'chai';
import { Provider } from '../src/classes/Provider';

describe('getEnabled', () => {
  it('will return false if no Environment Variable has been set', () => {
    const env = {};
    expect(getEnabled('google', env)).to.equal(false);
  });

  it('will return true if the Environment Variable has been set to true', () => {
    const env = { FACEBOOK_ENABLED: 'true' };
    expect(getEnabled('facebook', env)).to.equal(true);
  });

  it('will return false if explicitly set to false', () => {
    const env = { FACEBOOK_ENABLED: 'false' };
    expect(getEnabled('facebook', env)).to.equal(false);
  });
});
