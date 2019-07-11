import expressConfig from "./config.express";

function getAuthenticatorCallbackHost(env = process.env): string {
  return (
    env.AUTHENTICATOR_CALLBACK_HOST ||
    `http://localhost:${expressConfig.httpPort}`
  );
}

function getApplicationCallbackHost(env = process.env): string {
  return env.APPLICATION_CALLBACK_HOST || "http://localhost:8080";
}

function getApplicationLogoutPath(env = process.env): string {
  if (!env.APPLICATION_LOGOUT_PATH) return "/logout";
  if (env.APPLICATION_LOGOUT_PATH.indexOf("/") !== 0)
    return `/${env.APPLICATION_LOGOUT_PATH}`;
  return env.APPLICATION_LOGOUT_PATH;
}

function getApplicationLogourURL(env = process.env): string {
  return `${getApplicationCallbackHost(env)}${getApplicationLogoutPath(env)}`;
}

export default {
  applicationCallbackHost: getApplicationCallbackHost(),
  authenticatorCallbackHost: getAuthenticatorCallbackHost(),
  applicationLogoutURL: getApplicationLogourURL()
};
