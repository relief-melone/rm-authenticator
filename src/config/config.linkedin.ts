import { Provider } from "../classes/interface.provider";
import { getCallbackURL, getCallbackPath } from "./functions/getCallback";
import { getEnabled } from "./functions/getEnabled";
import { getClientInfo } from "./functions/getClient";
import {
  getApplicationCallbackPath,
  getApplicationCallbackURL
} from "./functions/getApplicationCallback";
import { getScope } from "./functions/getScope";

export default (getEnabled(Provider.linkedin)
  ? {
      clientId: getClientInfo(Provider.linkedin, "id"),
      clientSecret: getClientInfo(Provider.linkedin, "secret"),
      callbackPath: getCallbackPath(Provider.linkedin),
      callbackURL: getCallbackURL(Provider.linkedin),
      applicationCallbackPaths: {
        success: getApplicationCallbackPath(Provider.linkedin, "success"),
        failure: getApplicationCallbackPath(Provider.linkedin, "failure"),
        logout: getApplicationCallbackPath(Provider.linkedin, "logout")
      },
      applicationCallbackURLs: {
        success: getApplicationCallbackURL(Provider.linkedin, "success"),
        failure: getApplicationCallbackURL(Provider.linkedin, "failure"),
        logout: getApplicationCallbackURL(Provider.linkedin, "logout")
      },
      scope: getScope(Provider.linkedin, [
        'r_liteprofile', 
        'r_emailaddress',
        'w_member_social'
      ])
    }
  : null);
