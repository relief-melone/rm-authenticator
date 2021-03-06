import { Provider } from '../../classes/Provider';

export function getScope(
  provider: Provider,
  defaultScopes: string[],
  env = process.env
): string[] {
  const envVar = `${provider.toUpperCase()}_SCOPE`;
  if (!env[envVar]) return defaultScopes;
  return (env[envVar] as string).split(';');
}
