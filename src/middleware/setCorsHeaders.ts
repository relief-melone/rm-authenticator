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
    return typeof(req.hostname) === 'string' ? req.hostname : '*';
  } else {
    if(typeof(req.hostname) === 'string'){      
      if(configMain.allowedRedirectHosts.indexOf(req.hostname) !== -1)
        return req.hostname;        
    }
  }
  return '';
};