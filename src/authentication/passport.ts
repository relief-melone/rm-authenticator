import passport from "passport";
import session from "express-session";
import googleStrategy from "./strategies/strategy.google";
import facebookStrategy from "./strategies/strategy.facebook";
import linkedInStrategy from "./strategies/strategy.linkedin"
import configGoogle from "../config/config.google";
import configFacebook from "../config/config.facebook";
import configLinkedin from "../config/config.linkedin";

export default app => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "superSecretSecret"
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  if (configGoogle) passport.use(googleStrategy());
  if (configFacebook) passport.use(facebookStrategy());
  if (configLinkedin) passport.use(linkedInStrategy());

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
};

const serializeUser = (user, done) => {
  done(null, user);
};

const deserializeUser = (user, done) => {
  done(null, user);
};
