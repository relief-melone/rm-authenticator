export default interface JWTConfig {
  isJwtEnabled: boolean;
  mode: 'direct' | 'key';
  secret: string | Buffer;
  expiresIn: string;
  algorithm: 'RS256';
};