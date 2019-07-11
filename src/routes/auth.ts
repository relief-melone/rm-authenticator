import { Router, Request, Response } from "express";
import passport from "passport";
import GoogleConfig, { getGoogleEnabled } from "../config/config.google";

const router = Router();
const googleConfig = GoogleConfig();

// Google
if (getGoogleEnabled()) {
  router.get("/google", (req, res, next) => {
    passport.authenticate("google", {
      scope: googleConfig.scope
    })(req, res, next);
  });

  router.get(
    `/google${googleConfig.callbackPath}`,
    passport.authenticate("google", {
      failureRedirect: googleConfig.applicationCallbackURLs.failure
    }),
    (req: Request, res: Response) => {
      res.redirect(googleConfig.applicationCallbackURLs.success);
    }
  );
}

// Facebook

router.get("/userinfo", (req, res, next) => {
  if (!req.session) return res.status(401).send();
  if (!req.session.passport) return res.status(401).send();
  if (!req.session.passport.user) return res.status(401).send();
  res.json(req.session.passport.user).send();
});

export default router;
