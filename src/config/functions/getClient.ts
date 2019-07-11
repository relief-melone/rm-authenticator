import { Provider } from "../../interfaces/interface.provider";

export function getClientId(provider: Provider, env = process.env): string {
  const envVar = `${provider.toUpperCase()}_CLIENT_ID`;
  if (!env[envVar]) throw new Error(`${envVar} has to be set!`);
  return env[envVar] as string;
}

export function getClientSecret(provider: Provider, env = process.env): string {
  const envVar = `${provider.toUpperCase()}_CLIENT_SECRET`;
  if (!env[envVar]) throw new Error(`${envVar} has to be set!`);
  return env[envVar] as string;
}
