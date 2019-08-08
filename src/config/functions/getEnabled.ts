import { Provider } from "../../interfaces/interface.provider";
import { Database } from "../../interfaces/interface.database";

export function getEnabled(
  provider: Provider | Database,
  env = process.env
): boolean {
  let envVar = `${provider.toUpperCase()}_ENABLED`;
  return env[envVar] === "true";
}
