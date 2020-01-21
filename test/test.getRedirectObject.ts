import 'module-alias/register';
import { expect } from 'chai';
import getRedirectObject from '../src/services/getRedirectObject';
import MainConfig from '@/classes/MainConfig';
import RedirectObject from '@/classes/RedirectObject';

describe('getRedirectObject', () => {
  it('will return the default values when no overrides have been sent', () => {
    // Assert
    const expected: RedirectObject = {
      success: '//default.com/',
      failure: '//default.com/fail'
    };
    expect(getRedirectObject(
      undefined, 
      undefined, 
      { AllowedRedirectHosts: ['default.com'] },
      { 
        ApplicationSuccessCallbackURL: '//default.com/',
        ApplicationFailureCallbackURL: '//default.com/fail' 
      },     
    )).to.deep.equal(expected);
  });

  it('will return the default value only for non set override', () => {
    // Assert
    const expected: RedirectObject = {
      success: '//not-default-but-allowed.com',
      failure: '//default.com/fail'
    };
    expect(getRedirectObject(
      '//not-default-but-allowed.com', 
      undefined, 
      { AllowedRedirectHosts: ['not-default-but-allowed.com', 'default.com'] },
      { 
        ApplicationSuccessCallbackURL: '//default.com/',
        ApplicationFailureCallbackURL: '//default.com/fail' 
      } as any,     
    )).to.deep.equal(expected);
  });

  it('will return both overridden redirects', () => {
    // Assert
    const expected: RedirectObject = {
      success: '//not-default-but-allowed.com',
      failure: '//not-default-but-allowed.com/fail'
    };
    expect(getRedirectObject(
      '//not-default-but-allowed.com', 
      '//not-default-but-allowed.com/fail', 
      { AllowedRedirectHosts: ['not-default-but-allowed.com', 'default.com'] },
      { 
        ApplicationSuccessCallbackURL: '//default.com/',
        ApplicationFailureCallbackURL: '//default.com/fail' 
      },     
    )).to.deep.equal(expected);
  });

  it('will throw if overridden hostname is not in allowed', () => {
    // Assert
    expect(() => getRedirectObject(
      '//not-default-and-forbidden.com', 
      '//not-default-but-allowed.com/fail', 
      { AllowedRedirectHosts: ['not-default-but-allowed.com', 'default.com'] },
      { 
        ApplicationSuccessCallbackURL: '//default.com/',
        ApplicationFailureCallbackURL: '//default.com/fail' 
      },     
    )).to.throw();
  });

  it('will throw if default hostname is not in allowed', () => {
    // Assert
    expect(() => getRedirectObject(
      undefined,
      undefined,
      { AllowedRedirectHosts: ['not-default-but-allowed.com', 'default.com'] },
      { 
        ApplicationSuccessCallbackURL: '//forbidden.com/',
        ApplicationFailureCallbackURL: '//default.com/fail' 
      },     
    )).to.throw();
  });
});
