import { Router, Request, Response } from "express";
import passport from "passport";
import facebookConfig from "../config/config.facebook";
import mainConfig from "../config/config.main";
import configFacebook from "../config/config.facebook";
import configGoogle from "../config/config.google";

const router = Router();

// Google
if (configGoogle) {
  router.get(
    "/google",
    passport.authenticate("google", {
      scope: configGoogle.scope
    })
  );

  router.get(
    `/google${configGoogle.callbackPath}`,
    passport.authenticate("google", {
      // successRedirect: configGoogle.applicationCallbackURLs.success,
      failureRedirect: configGoogle.applicationCallbackURLs.failure,
      scope: (configGoogle as any).scope
    }),
    (req: Request, res: Response) => {
      res.redirect((configGoogle as any).applicationCallbackURLs.success);
    }
  );
}

// Facebook
if (facebookConfig) {
  router.get(
    "/facebook",
    passport.authenticate("facebook", {
      scope: facebookConfig.scope
    })
  );

  router.get(
    `/facebook${facebookConfig.callbackPath}`,
    passport.authenticate("facebook", {
      successRedirect: (configFacebook as any).applicationCallbackURLs.success,
      failureRedirect: (configFacebook as any).applicationCallbackURLs.failure
    })
  );
}

// UserInfo
router.get("/userinfo", (req, res, next) => {
  if (!req.session) return res.status(401).send();
  if (!req.session.passport) return res.status(401).send();
  if (!req.session.passport.user) return res.status(401).send();
  res.json(req.session.passport.user).end();
});

// Logout
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect(mainConfig.applicationLogoutURL);
});

export default router;
