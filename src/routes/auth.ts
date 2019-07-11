import { Router, Request, Response } from "express";
import passport from "passport";
import googleConfig from "../config/config.google";
import mainConfig from "../config/config.main";

const router = Router();

// Google
if (googleConfig !== null) {
  router.get(
    "/google",
    passport.authenticate("google", {
      scope: googleConfig.scope
    })
  );

  router.get(
    `/google${googleConfig.callbackPath}`,
    passport.authenticate("google", {
      failureRedirect: googleConfig.applicationCallbackURLs.failure
    }),
    (req: Request, res: Response) => {
      if (googleConfig) {
        res.redirect(googleConfig.applicationCallbackURLs.success);
      }
    }
  );
}

// Facebook

// UserInfo
router.get("/userinfo", (req, res, next) => {
  if (!req.session) return res.status(401).send();
  if (!req.session.passport) return res.status(401).send();
  if (!req.session.passport.user) return res.status(401).send();
  res.json(req.session.passport.user).send();
});

// Logout
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect(mainConfig.applicationLogoutURL);
});

export default router;
