import { Provider } from "../../classes/Provider";

export function getClientInfo(
  provider: Provider,
  type: "id" | "secret",
  env = process.env
) {
  const envVar = `${provider.toUpperCase()}_CLIENT_${type.toUpperCase()}`;
  if (!env[envVar]) throw new Error(`${envVar} has to be set!`);
  return env[envVar] as string;
}
