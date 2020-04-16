import RedirectObject from '@/classes/RedirectObject';
import ConfigMain from '@/config/config.main';
import parseUrl from 'url-parse';
import logger from './log/logger';

export default (
  logoutRedirectQuery?: string,
  configMain=ConfigMain,
): RedirectObject => {
  const defaultRedirects = {    
    logout: configMain.applicationLogoutURL
  };
  
  const logout = parseUrl(logoutRedirectQuery || defaultRedirects.logout);

  if(!configMain.allowedRedirectHosts.some(hostname => hostname === logout.hostname)){
    logger.info('Redirect was not allowed', {
      allowedHosts: configMain.allowedRedirectHosts,
      hostname: logout.hostname
    });
    throw 'Redirect not allowed';        
  }
  
  return {
    success: '',
    failure: '',
    logout: logout.href
  };
};