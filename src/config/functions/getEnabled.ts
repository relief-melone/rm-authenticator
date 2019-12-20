import { Provider } from "../../classes/interface.provider";
import { Database } from "../../classes/interface.database";

export function getEnabled(
  provider: Provider | Database,
  env = process.env
): boolean {
  let envVar = `${provider.toUpperCase()}_ENABLED`;
  return env[envVar] === "true";
}
