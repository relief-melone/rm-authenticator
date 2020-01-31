import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import mainConfig from '../config/config.main';
import configFacebook from '../config/config.facebook';
import configGoogle from '../config/config.google';
import configLinkedIn from '../config/config.linkedin';
import data from './data.mongodb';
import configMongodb from '../config/config.mongodb';
import controllerAuthCallback from '@/controller/controller.auth.callback';
import configMain from '../config/config.main';
import configJwt from '@/config/config.jwt';
import controllerAuthJwt from '@/controller/controller.auth.jwt';

const router = Router();

// Google
if (configGoogle) {
  router.get(
    '/google',
    passport.authenticate('google', {
      scope: configGoogle.scope
    })
  );

  router.get(
    `/google${configGoogle.callbackPath}`,
    (req: Request, res: Response, next: NextFunction) => controllerAuthCallback(req,res,next,'google', configGoogle)
  );
}

// Facebook
if (configFacebook) {
  router.get(
    '/facebook',
    passport.authenticate('facebook', {
      scope: configFacebook.scope
    })
  );

  router.get(
    `/facebook${configFacebook.callbackPath}`,
    (req: Request, res: Response, next: NextFunction) => controllerAuthCallback(req,res,next,'facebook', configFacebook)
  );
}

// LinkedIn
if (configLinkedIn) {
  router.get(
    '/linkedin',
    passport.authenticate('linkedin', {
      scope: configLinkedIn.scope
    })
  );

  router.get(
    `/linkedin${configLinkedIn.callbackPath}`,
    (req: Request, res: Response, next: NextFunction) => controllerAuthCallback(req,res,next,'linkedin', configLinkedIn)
  );
}

// UserInfo
router.get('/userinfo', (req: Request, res: Response, next: NextFunction) => {
  if (!req.session) return res.status(401).send();
  if (!req.session.passport) return res.status(401).send();
  if (!req.session.passport.user) return res.status(401).send();
  res.json(req.session.passport.user).end();
});

if (configMongodb()) {
  console.log('MongoDB enabled. Opening Data Enpoints');
  router.use(data);
}

// Logout
router.get('/logout', (req: Request, res: Response, next: NextFunction): void => {
  req.logout();
  if(!req.session){
    res.redirect(configMain.applicationLogoutURL);
    return;
  }
  res.redirect(req.session.redirect.logout);
  return;
});


if(configJwt.isJwtEnabled){
  router.get('/jwt', controllerAuthJwt);
}

export default router;
