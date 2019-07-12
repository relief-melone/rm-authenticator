import { Provider } from "../../interfaces/interface.provider";

export function getEnabled(provider: Provider, env = process.env): boolean {
  let envVar = `${provider.toUpperCase()}_ENABLED`;
  return env[envVar] === "true";
}
