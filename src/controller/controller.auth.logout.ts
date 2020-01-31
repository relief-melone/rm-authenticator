import { NextFunction, Request, Response } from 'express';
import configMain from '@/config/config.main';

export default (req: Request, res: Response, next: NextFunction): void => {
  req.logout();
  if(!req.session)return res.redirect(configMain.applicationLogoutURL);

  return res.redirect(req.session.redirect.logout);  
};