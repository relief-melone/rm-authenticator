import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { Provider } from '@/classes/Provider';


export default (req: Request, res: Response, next: NextFunction, provider: Provider, config: any): void => {
  passport.authenticate(provider, (err, user, info) => {
    if(err || !req.session){
      res.redirect(req.session ? req.session.redirect.failure : (config as any).applicationCallbackURLs.failure);
      return;
    }        
    if(!(req.session as any).passport) req.session.passport = {};
    req.session.passport.user = user;
    res.redirect(req.session ? req.session.redirect.success : (config as any).applicationCallbackURLs.success);
    return;
  })(req,res,next);
};