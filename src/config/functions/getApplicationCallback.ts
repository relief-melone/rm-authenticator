import { Provider } from "../../interfaces/interface.provider";
import { getApplicationCallbackHost } from "../config.main";

const defaultPaths = {
  success: "",
  failure: "/failure",
  logout: "/logout"
};

export function getApplicationCallbackPath(
  provider: Provider,
  type: "success" | "failure" | "logout",
  env = process.env
): string {
  const envVar = `${provider.toUpperCase()}_APPLICATION_${type.toUpperCase()}_CALLBACK_PATH`;
  if (!env[envVar]) return defaultPaths[type];
  let fixedPath: string =
    `${env[envVar]}`.indexOf("/") === 0 ? `${env[envVar]}` : `/${env[envVar]}`;

  return fixedPath;
}

export function getApplicationCallbackURL(
  provider: Provider,
  type: "success" | "failure" | "logout",
  env = process.env
): string {
  return `${getApplicationCallbackHost(env)}${getApplicationCallbackPath(
    provider,
    type,
    env
  )}`;
}
