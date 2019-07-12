import { Provider } from "../interfaces/interface.provider";
import { getCallbackURL, getCallbackPath } from "./functions/getCallback";
import { getEnabled } from "./functions/getEnabled";
import { getClientInfo } from "./functions/getClient";
import {
  getApplicationCallbackPath,
  getApplicationCallbackURL
} from "./functions/getApplicationCallback";
import { getScope } from "./functions/getScope";

export default (getEnabled(Provider.google)
  ? {
      clientId: getClientInfo(Provider.google, "id"),
      clientSecret: getClientInfo(Provider.google, "secret"),
      callbackPath: getCallbackPath(Provider.google),
      callbackURL: getCallbackURL(Provider.google),
      applicationCallbackPaths: {
        success: getApplicationCallbackPath(Provider.google, "success"),
        failure: getApplicationCallbackPath(Provider.google, "failure"),
        logout: getApplicationCallbackPath(Provider.google, "logout")
      },
      applicationCallbackURLs: {
        success: getApplicationCallbackURL(Provider.google, "success"),
        failure: getApplicationCallbackURL(Provider.google, "failure"),
        logout: getApplicationCallbackURL(Provider.google, "logout")
      },
      scope: getScope(Provider.google, [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ])
    }
  : null);
