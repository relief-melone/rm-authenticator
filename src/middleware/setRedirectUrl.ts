import { Response, NextFunction, Request } from 'express';
import getProviderRedirectObject from '@/services/getProviderRedirectObject';
import getLogoutRedirectObject from '@/services/getLogoutRedirectObject';

export default (
  req: Request, 
  res: Response, 
  next: NextFunction, 
): void => {
  if(req.session){
    const splitPath= req.path.split('/').filter(a => a);
    if(
      splitPath.length === 2 && 
      ( 
        splitPath[1] === 'google' || 
        splitPath[1] === 'facebook' ||
        splitPath[1] === 'linkedin'
      )
    ){
      req.session.redirect = getProviderRedirectObject(
        splitPath[1], 
        req.query.successRedirect, 
        req.query.failureRedirect,
        req.query.logoutRedirect
      );
    }
    if(
      splitPath.length === 2 && 
      splitPath[1] === 'logout'      
    ){
      req.session.redirect = getLogoutRedirectObject(             
        req.query.logoutRedirect
      );
    }
  }
  next();
};