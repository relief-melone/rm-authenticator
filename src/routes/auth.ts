import { Router, Request, Response } from "express";
import passport from "passport";
import mainConfig from "../config/config.main";
import configFacebook from "../config/config.facebook";
import configGoogle from "../config/config.google";
import configLinkedIn from "../config/config.linkedin";
import data from "./data.mongodb";
import configMongodb from "../config/config.mongodb";

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
if (configFacebook) {
  router.get(
    "/facebook",
    passport.authenticate("facebook", {
      scope: configFacebook.scope
    })
  );

  router.get(
    `/facebook${configFacebook.callbackPath}`,
    passport.authenticate("facebook", {
      successRedirect: (configFacebook as any).applicationCallbackURLs.success,
      failureRedirect: (configFacebook as any).applicationCallbackURLs.failure
    })
  );
}

// LinkedIn
if (configLinkedIn) {
  router.get(
    "/linkedin",
    passport.authenticate("linkedin", {
      scope: configLinkedIn.scope
    })
  );

  router.get(
    `/linkedin${configLinkedIn.callbackPath}`,
    passport.authenticate("linkedin", {
      successRedirect: (configLinkedIn as any).applicationCallbackURLs.success,
      failureRedirect: (configLinkedIn as any).applicationCallbackURLs.failure
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

if (configMongodb()) {
  console.log("MongoDB enabled. Opening Data Enpoints");
  router.use(data);
}

// Logout
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect(mainConfig.applicationLogoutURL);
});

export default router;
