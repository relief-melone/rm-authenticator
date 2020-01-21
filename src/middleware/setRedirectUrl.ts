import { Response, NextFunction, Request } from 'express';
import getRedirectObject from '@/services/getRedirectObject';

export default (
  req: Request, 
  res: Response, 
  next: NextFunction, 
): void => {
  if(req.session){
    if(req.path === '/auth/webeam'){
      try {
        req.session.redirect = getRedirectObject(req.query.successRedirect, req.query.failureRedirect);
      } catch (err) {
        res.status(403).send(err);
        return;
      }
    }    
  }
  next();
};