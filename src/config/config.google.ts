import mainConfig from "./config.main";
import { Provider } from "../interfaces/interface.provider";
import { getCallbackURL, getCallbackPath } from "./functions/getCallback";
import { getEnabled } from "./functions/getEnabled";
import { getClientId, getClientSecret } from "./functions/getClient";

export function getGoogleEnabled(env = process.env): boolean {
  return getEnabled(Provider.google, env);
}

export function getGoogleClientId(env = process.env): string {
  return getClientId(Provider.google, env);
}

export function getGoogleClientSecret(env = process.env): string {
  return getClientSecret(Provider.google, env);
}

export function getGoogleCallbackPath(env = process.env): string {
  return getCallbackPath(Provider.google, env);
}

export function getGoogleCallbackURL(env = process.env): string {
  return getCallbackURL(Provider.google, env);
}

export function getApplicationSuccessCallbackPath(env = process.env): string {
  if (!env.GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH) return "/";
  let fixedPath: string =
    env.GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH.indexOf("/") === 0
      ? env.GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH
      : `/${env.GOOGLE_APPLICATION_SUCCESS_CALLBACK_PATH}`;

  return fixedPath;
}

export function getApplicationFailureCallbackPath(env = process.env): string {
  if (!env.GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH) return "/failure";
  let fixedPath: string =
    env.GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH.indexOf("/") === 0
      ? env.GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH
      : `/${env.GOOGLE_APPLICATION_FAILURE_CALLBACK_PATH}`;

  return fixedPath;
}

export function getApplicationSuccessCallbackURL(env = process.env): string {
  return `${
    mainConfig.applicationCallbackHost
  }${getApplicationSuccessCallbackPath(env)}`;
}

export function getApplicationFailureCallbackURL(env = process.env): string {
  return `${
    mainConfig.applicationCallbackHost
  }${getApplicationFailureCallbackPath(env)}`;
}

export function getScope(env = process.env): string[] {
  if (!env.GOOGLE_SCOPE) return ["profile", "email", "openid"];
  return env.GOOGLE_SCOPE.split(" ");
}

export default (getGoogleEnabled()
  ? {
      clientId: getGoogleClientId(),
      clientSecret: getGoogleClientSecret(),
      callbackPath: getGoogleCallbackPath(),
      callbackURL: getGoogleCallbackURL(),
      applicationCallbackPaths: {
        success: getApplicationSuccessCallbackPath(),
        failure: getApplicationFailureCallbackPath()
      },
      applicationCallbackURLs: {
        success: getApplicationSuccessCallbackURL(),
        failure: getApplicationFailureCallbackURL()
      },
      scope: getScope()
    }
  : null);
