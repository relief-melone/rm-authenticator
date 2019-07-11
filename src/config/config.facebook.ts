import mainConfig from "./config.main";

export function facebookEnabled(env = process.env): boolean {
  return env.FACEBOOK_ENABLED === "true";
}

export function getClientID(env = process.env): string {
  if (!env.FACEBOOK_CLIENT_ID)
    throw new Error("No ClientID for Facebook supplied");
  return env.FACEBOOK_CLIENT_ID;
}

export function getClientSecret(env = process.env): string {
  if (!env.FACEBOOK_CLIENT_SECRET)
    throw new Error("No ClientSecret for Facebook supplied");
  return env.FACEBOOK_CLIENT_SECRET;
}

export function getCallbackPath(env = process.env): string {
  if (!env.FACEBOOK_CALLBACK_PATH) return "/callback";
  if (env.FACEBOOK_CALLBACK_PATH.indexOf("/") !== 0)
    return `/${env.FACEBOOK_CALLBACK_PATH}`;
  return env.FACEBOOK_CALLBACK_PATH;
}

export function getCallbackURL(env = process.env): string {
  return `${mainConfig.applicationCallbackHost}${getCallbackPath(env)}`;
}
