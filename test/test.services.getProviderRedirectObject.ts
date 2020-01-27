import 'module-alias/register';
import { expect } from 'chai';
import getRedirectObject from '../src/services/getProviderRedirectObject';
import RedirectObject from '@/classes/RedirectObject';

describe('getProviderRedirectObject', () => {
  it('will return the default values when no overrides have been sent', () => {
    // Assert
    const expected: RedirectObject = {
      success: '//default.com/',
      failure: '//default.com/fail',
      logout: '//default.com/logout'
    };
    expect(getRedirectObject(
      'facebook',
      undefined, 
      undefined, 
      undefined,
      { allowedRedirectHosts: ['default.com'], applicationLogoutURL: '//default.com/logout'  } as any,
      { 
        applicationCallbackURLs: {
          success: '//default.com/',
          failure: '//default.com/fail',          
        }
      } as any,     
      null,
      null
    )).to.deep.equal(expected);
  });

  it('will return the default value only for non set override', () => {
    // Assert
    const expected: RedirectObject = {
      success: '//not-default-but-allowed.com',
      failure: '//default.com/fail',
      logout: '//default.com/logout'
    };
    expect(getRedirectObject(
      'google',
      '//not-default-but-allowed.com', 
      undefined, 
      undefined,
      { allowedRedirectHosts: ['not-default-but-allowed.com', 'default.com'], applicationLogoutURL: '//default.com/logout'  } as any,
      null,      
      { 
        applicationCallbackURLs: {
          success: '//default.com/',
          failure: '//default.com/fail',          
        }
      } as any,
      null
    )).to.deep.equal(expected);
  });

  it('will return all overridden redirects', () => {
    // Assert
    const expected: RedirectObject = {
      success: '//not-default-but-allowed.com',
      failure: '//not-default-but-allowed.com/fail',
      logout: '//not-default-but-allowed.com/logout'
    };
    expect(getRedirectObject(
      'linkedin',
      '//not-default-but-allowed.com', 
      '//not-default-but-allowed.com/fail', 
      '//not-default-but-allowed.com/logout', 
      { allowedRedirectHosts: ['not-default-but-allowed.com', 'default.com'], applicationLogoutURL:  '//default.com/logout' } as any,
      null,
      null,
      { 
        applicationCallbackURLs: {
          success: '//default.com/',
          failure: '//default.com/fail'          
        }
      } as any,  
    )).to.deep.equal(expected);
  });

  it('will throw if overridden hostname is not in allowed', () => {
    // Assert
    expect(() => getRedirectObject(
      'facebook',
      '//not-default-and-forbidden.com', 
      '//not-default-but-allowed.com/fail', 
      '//not-default-but-allowed.com/logout', 
      { allowedRedirectHosts: ['not-default-but-allowed.com', 'default.com'], applicationLogoutURL: '//default.com/logout' } as any,
      { 
        applicationCallbackURLs: {
          success: '//default.com/',
          failure: '//default.com/fail',          
        }
      } as any,
      null,
      null     
    )).to.throw();
  });

  it('will throw if default hostname is not in allowed', () => {
    // Assert
    expect(() => getRedirectObject(
      'facebook',
      undefined,
      undefined,
      undefined,
      { AllowedRedirectHosts: ['not-default-but-allowed.com', 'default.com'], applicationLogoutURL: '//default.com/logout'  } as any,
      { 
        applicationCallbackURLs: {
          success: '//forbidden.com/',
          failure: '//default.com/fail',          
        }
      } as any,     
    )).to.throw();
  });
});
