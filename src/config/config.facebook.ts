import { Provider } from '../classes/Provider';
import { getCallbackURL, getCallbackPath } from './functions/getCallback';
import { getEnabled } from './functions/getEnabled';
import { getClientInfo } from './functions/getClient';
import {
  getApplicationCallbackPath,
  getApplicationCallbackURL
} from './functions/getApplicationCallback';
import { getScope } from './functions/getScope';
import ConfigProvider from '@/classes/Config';

const config: (ConfigProvider|null) =(getEnabled('facebook')
  ? {
    clientId: getClientInfo('facebook', 'id'),
    clientSecret: getClientInfo('facebook', 'secret'),
    callbackPath: getCallbackPath('facebook'),
    callbackURL: getCallbackURL('facebook'),
    applicationCallbackPaths: {
      success: getApplicationCallbackPath('facebook', 'success'),
      failure: getApplicationCallbackPath('facebook', 'failure'),      
    },
    applicationCallbackURLs: {
      success: getApplicationCallbackURL('facebook', 'success'),
      failure: getApplicationCallbackURL('facebook', 'failure'),      
    },
    scope: getScope('facebook', ['email', 'public_profile'])
  } 
  : null);

export default config;