import 'module-alias/register';

import { getAllowedOriginHeader } from '@/middleware/setCorsHeaders';
import MainConfig from '@/classes/MainConfig';
import { expect } from 'chai';

describe('getAllowedOriginHeader', () => {
  it('will correctly get * if dev mode but no hostname is present', () => {
    // Prepare
    const req = { hostname: undefined } as any;

    const mainConfig = {
      isDevMode: true
    } as any as MainConfig;

    // Assert
    expect(getAllowedOriginHeader(req, mainConfig)).to.equal('*');
  });

  it('will correctly get current origin if dev mode and origin in header', () => {
    // Prepare
    const req = {
      hostname: 'current.origin.com'
    } as any;

    const mainConfig = {
      isDevMode: true
    } as any as MainConfig;

    // Assert
    expect(getAllowedOriginHeader(req, mainConfig)).to.equal('current.origin.com');
  });

  it('will correctly get empty string if dev mode off and origin not in allowed hosts', () => {
    // Prepare
    const req = {
      hostname: 'forbidden-host.com'
    } as any;

    const mainConfig = {
      isDevMode: false,
      allowedRedirectHosts: ['localhost','allowed-host.com']
    } as any as MainConfig;

    // Assert
    expect(getAllowedOriginHeader(req, mainConfig)).to.equal('');
  });

  it('will correctly get current origin string if dev mode off and origin  in allowed hosts', () => {
    // Prepare
    const req = {
      hostname: 'allowed-host.com'
    } as any;

    const mainConfig = {
      isDevMode: false,
      allowedRedirectHosts: ['localhost','allowed-host.com']
    } as any as MainConfig;

    // Assert
    expect(getAllowedOriginHeader(req, mainConfig)).to.equal('allowed-host.com');
  });

});