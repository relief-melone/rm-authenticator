const parseEnvInt = (EnvVar: string): number | null => {
  if (!process.env[EnvVar]) {
    return null;
  } else {
    return parseInt(process.env[EnvVar] as string);
  }
};

export default {
  httpPort: parseEnvInt("HTTP_PORT") || 8081
  // httpsPort: parseEnvInt("HTTPS_PORT") || 8082
};
