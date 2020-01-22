import { getCallbackURL, getCallbackPath } from './functions/getCallback';
import { getEnabled } from './functions/getEnabled';
import { getClientInfo } from './functions/getClient';
import {
  getApplicationCallbackPath,
  getApplicationCallbackURL
} from './functions/getApplicationCallback';
import { getScope } from './functions/getScope';
import ConfigProvider from '@/classes/Config';

const config: (ConfigProvider | null) = (getEnabled('linkedin')
  ? {
    clientId: getClientInfo('linkedin', 'id'),
    clientSecret: getClientInfo('linkedin', 'secret'),
    callbackPath: getCallbackPath('linkedin'),
    callbackURL: getCallbackURL('linkedin'),
    applicationCallbackPaths: {
      success: getApplicationCallbackPath('linkedin', 'success'),
      failure: getApplicationCallbackPath('linkedin', 'failure')      
    },
    applicationCallbackURLs: {
      success: getApplicationCallbackURL('linkedin', 'success'),
      failure: getApplicationCallbackURL('linkedin', 'failure'),      
    },
    scope: getScope('linkedin', [
      'r_liteprofile', 
      'r_emailaddress',
      'w_member_social'
    ])
  }
  : null);

export default config;
