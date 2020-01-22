import { getCallbackURL, getCallbackPath } from './functions/getCallback';
import { getEnabled } from './functions/getEnabled';
import { getClientInfo } from './functions/getClient';
import {
  getApplicationCallbackPath,
  getApplicationCallbackURL
} from './functions/getApplicationCallback';
import { getScope } from './functions/getScope';
import ConfigProvider from '@/classes/Config';

const config: (ConfigProvider|null) = (getEnabled('google')
  ? {
    clientId: getClientInfo('google', 'id'),
    clientSecret: getClientInfo('google', 'secret'),
    callbackPath: getCallbackPath('google'),
    callbackURL: getCallbackURL('google'),
    applicationCallbackPaths: {
      success: getApplicationCallbackPath('google', 'success'),
      failure: getApplicationCallbackPath('google', 'failure'),      
    },
    applicationCallbackURLs: {
      success: getApplicationCallbackURL('google', 'success'),
      failure: getApplicationCallbackURL('google', 'failure'),      
    },
    scope: getScope('google', [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ])
  }
  : null);


export default config;
