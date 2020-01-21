import RedirectObject from '@/classes/RedirectObject';
import ConfigMain from '@/config/config.main';
import parseUrl from 'url-parse';


export default (
  successRedirectQuery?: string, 
  failureRedirectQuery?: string, 
  configMain=ConfigMain,   
): RedirectObject => {
  const success = parseUrl(successRedirectQuery);
  const failure = parseUrl(failureRedirectQuery);  

  if(
    !configMain.AllowedRedirectHosts.some(hostname => hostname === success.hostname) ||
    !configMain.AllowedRedirectHosts.some(hostname => hostname === failure.hostname)
  ){
    throw 'Redirect not allowed';        
  }
  
  return {
    success: success.href,
    failure: failure.href
  };
};