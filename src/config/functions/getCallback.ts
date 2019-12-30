import { Provider } from "../../classes/Provider";
import { getAuthenticatorCallbackHost } from "../config.main";

export function getCallbackPath(provider: Provider, env = process.env): string {
  const providerInEnv: string = provider.toUpperCase();
  const pathVariable: string = `${providerInEnv}_CALLBACK_PATH`;

  if (!env[pathVariable]) return "/callback";
  if ((env[pathVariable] as string).indexOf("/") !== 0)
    return `/${env[pathVariable]}`;
  return env[pathVariable] as string;
}

export function getCallbackURL(provider: Provider, env = process.env): string {
  return `${getAuthenticatorCallbackHost(
    env
  )}/auth/${provider}${getCallbackPath(provider, env)}`;
}
