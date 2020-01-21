import { Provider } from '../classes/Provider';
import { getCallbackURL, getCallbackPath } from './functions/getCallback';
import { getEnabled } from './functions/getEnabled';
import { getClientInfo } from './functions/getClient';
import {
  getApplicationCallbackPath,
  getApplicationCallbackURL
} from './functions/getApplicationCallback';
import { getScope } from './functions/getScope';

export default (getEnabled(Provider.facebook)
  ? {
    clientId: getClientInfo(Provider.facebook, 'id'),
    clientSecret: getClientInfo(Provider.facebook, 'secret'),
    callbackPath: getCallbackPath(Provider.facebook),
    callbackURL: getCallbackURL(Provider.facebook),
    applicationCallbackPaths: {
      success: getApplicationCallbackPath(Provider.facebook, 'success'),
      failure: getApplicationCallbackPath(Provider.facebook, 'failure'),
      logout: getApplicationCallbackPath(Provider.facebook, 'logout')
    },
    applicationCallbackURLs: {
      success: getApplicationCallbackURL(Provider.facebook, 'success'),
      failure: getApplicationCallbackURL(Provider.facebook, 'failure'),
      logout: getApplicationCallbackURL(Provider.facebook, 'logout')
    },
    scope: getScope(Provider.facebook, ['email', 'public_profile'])
  }
  : null);
