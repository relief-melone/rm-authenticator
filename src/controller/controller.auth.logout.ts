import { NextFunction, Request, Response } from 'express';
import configMain from '@/config/config.main';

export default (req: Request, res: Response, next: NextFunction): void => {
  req.logout();
  if(!req.session)return res.redirect(configMain.applicationLogoutURL);

  const logout = req.session.redirect.logout;
  req.session.destroy(err => {
    return res.redirect(logout);  
  });
  
};