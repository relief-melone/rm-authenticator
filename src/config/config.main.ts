import expressConfig from "./config.express";
import { getCallbackURL } from "./config.google";

function getAuthenticatorCallbackHost(env = process.env): string {
  return (
    env.AUTHENTICATOR_CALLBACK_HOST ||
    `http://localhost:${expressConfig.httpPort}`
  );
}

function getApplicationCallbackHost(env = process.env): string {
  return env.APPLICATION_CALLBACK_HOST || "http://localhost:8080";
}

export default (env = process.env) => ({
  applicationCallbackHost: getApplicationCallbackHost(env),
  authenticatorCallbackHost: getAuthenticatorCallbackHost(env)
});
