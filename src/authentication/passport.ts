import passport from "passport";
import session from "express-session";
import googleStrategy from "./strategies/strategy.google";

export default app => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "superSecretSecret"
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(googleStrategy());

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
};

const serializeUser = (user, done) => {
  done(null, user);
};

const deserializeUser = (user, done) => {
  done(null, user);
};
