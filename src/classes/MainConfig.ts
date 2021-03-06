export default interface MainConfig {
  applicationCallbackHost: string;
  authenticatorCallbackHost: string;
  applicationLogoutURL: string;
  allowedRedirectHosts: string[];
  isDevMode: boolean;
}