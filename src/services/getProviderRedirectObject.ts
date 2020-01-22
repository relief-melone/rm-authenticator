import RedirectObject, { DefaultRedirectObject } from '@/classes/RedirectObject';
import ConfigMain from '@/config/config.main';
import parseUrl from 'url-parse';
import ConfigFacebook from '@/config/config.facebook';
import ConfigGoogle from '@/config/config.google';
import ConfigLinkedin from '@/config/config.linkedin';
import { ProviderAndLogout } from '@/classes/Provider';

export default (
  providerOrLogout: ProviderAndLogout,
  successRedirectQuery?: string, 
  failureRedirectQuery?: string, 
  logoutRedirectQuery?: string,
  configMain=ConfigMain,
  configFacebook=ConfigFacebook,
  configGoogle=ConfigGoogle,
  configLinkedin=ConfigLinkedin
): RedirectObject => {
  const defaultRedirects: DefaultRedirectObject = {
    facebook: configFacebook ? {
      success: configFacebook.applicationCallbackURLs.success,
      failure: configFacebook.applicationCallbackURLs.failure,
    } : null,
    google: configGoogle ? {
      success: configGoogle.applicationCallbackURLs.success,
      failure: configGoogle.applicationCallbackURLs.failure,      
    } : null,
    linkedin: configLinkedin ? {
      success: configLinkedin.applicationCallbackURLs.success,
      failure: configLinkedin.applicationCallbackURLs.failure,      
    }: null,
    logout: configMain.applicationLogoutURL
  };

  const success = parseUrl(successRedirectQuery || (defaultRedirects[providerOrLogout] ? (defaultRedirects[providerOrLogout] as RedirectObject).success : null) );
  const failure = parseUrl(failureRedirectQuery || (defaultRedirects[providerOrLogout] ? (defaultRedirects[providerOrLogout] as RedirectObject).failure : null) );
  const logout = parseUrl(logoutRedirectQuery || defaultRedirects.logout);

  if(
    !configMain.allowedRedirectHosts.some(hostname => hostname === success.hostname) ||
    !configMain.allowedRedirectHosts.some(hostname => hostname === failure.hostname) ||
    !configMain.allowedRedirectHosts.some(hostname => hostname === logout.hostname)
  ){
    throw 'Redirect not allowed';        
  }
  
  return {
    success: success.href,
    failure: failure.href,
    logout: logout.href
  };
};