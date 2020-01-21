import { Provider } from '../../classes/Provider';
import { Database } from '../../classes/Database';

export function getEnabled(
  provider: Provider | Database,
  env = process.env
): boolean {
  const envVar = `${provider.toUpperCase()}_ENABLED`;
  return env[envVar] === 'true';
}
