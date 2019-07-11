import MainConfig from "./config.main";

const mainConfig = MainConfig();

export function getGoogleEnabled(env = process.env): boolean {
  return env.GOOGLE_ENABLED === "true";
}

export function getClientId(env = process.env): string {
  if (!env.GOOGLE_CLIENT_ID) throw new Error("GOOGLE_CLIENT_ID has to be set!");
  return env.GOOGLE_CLIENT_ID;
}

export function getClientSecret(env = process.env): string {
  if (!env.GOOGLE_CLIENT_SECRET)
    throw new Error("GOOGLE_CLIENT_SECRET has to be set!");
  return env.GOOGLE_CLIENT_SECRET;
}

export function getGoogleCallbackPath(env = process.env): string {
  if (!env.GOOGLE_CALLBACK_PATH) return "/callback";
  if (env.GOOGLE_CALLBACK_PATH.indexOf("/") !== 0)
    return `/${env.GOOGLE_CALLBACK_PATH}`;
  return env.GOOGLE_CALLBACK_PATH;
}

export function getCallbackURL(env = process.env): string {
  return `${mainConfig.authenticatorCallbackHost}${getGoogleCallbackPath(env)}`;
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

export default () => ({
  consumerKey: getClientId(),
  consumerSecret: getClientSecret(),
  callbackPath: getGoogleCallbackPath(),
  callbackURL: getCallbackURL(),
  applicationCallbackPaths: {
    success: getApplicationSuccessCallbackPath(),
    failure: getApplicationFailureCallbackPath()
  },
  applicationCallbackURLs: {
    success: getApplicationSuccessCallbackURL(),
    failure: getApplicationFailureCallbackURL()
  },
  scope: getScope()
});
