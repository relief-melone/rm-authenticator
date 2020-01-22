export default interface ConfigProvider {
  clientId: string;
  clientSecret: string;
  callbackPath: string;
  callbackURL: string;
  applicationCallbackPaths: {
    success: string;
    failure: string;      
  };
  applicationCallbackURLs: {
    success: string;
    failure: string;      
  };
  scope: string[];
}