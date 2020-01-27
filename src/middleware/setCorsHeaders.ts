import { Request, Response, NextFunction } from 'express';
import MainConfig from '@/config/config.main';
import urlParse from 'url-parse';

export default (req: Request, res: Response, next: NextFunction, mainConfig= MainConfig): void => {
  res.header('Access-Control-Allow-Origin', getAllowedOriginHeader(req, mainConfig));
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, UPDATE');

  next();
};

export const getAllowedOriginHeader = (req: Request, configMain = MainConfig): string => {
  if(configMain.isDevMode){
    return typeof(req.headers.origin) === 'string' ? req.headers.origin : '*';
  } else {
    if(typeof(req.headers.origin) === 'string'){
      const url = urlParse(req.headers.origin);
      if(configMain.allowedRedirectHosts.indexOf(url.hostname) !== -1){
        return req.headers.origin;
      }
    } 

    return '';
       
  }
};