import expressConfig from './config.express';
import MainConfig from '@/classes/MainConfig';

export function getAuthenticatorCallbackHost(env = process.env): string {
  return (
    env.AUTHENTICATOR_CALLBACK_HOST ||
    `http://localhost:${expressConfig.httpPort}`
  );
}

export function getApplicationCallbackHost(env = process.env): string {
  return env.APPLICATION_CALLBACK_HOST || 'http://localhost:8080';
}

export function getApplicationLogoutPath(env = process.env): string {
  if (!env.APPLICATION_LOGOUT_PATH) return '/logout';
  if (env.APPLICATION_LOGOUT_PATH.indexOf('/') !== 0)
    return `/${env.APPLICATION_LOGOUT_PATH}`;
  return env.APPLICATION_LOGOUT_PATH;
}

export function getApplicationLogourURL(env = process.env): string {
  return `${getApplicationCallbackHost(env)}${getApplicationLogoutPath(env)}`;
}

export const getAllowedRedirectHosts = (env = process.env): string[] => {
  return (process.env.ALLOWED_REDIRECT_HOSTS || 'localhost')
    .split(',')
    .map(a => a.toLowerCase());
};

export default {
  applicationCallbackHost: getApplicationCallbackHost(),
  authenticatorCallbackHost: getAuthenticatorCallbackHost(),
  applicationLogoutURL: getApplicationLogourURL(),
  allowedRedirectHosts: getAllowedRedirectHosts()
} as MainConfig;
