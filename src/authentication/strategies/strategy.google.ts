import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import GoogleConfig from "../../config/config.google";

export default (config = GoogleConfig()) => {
  return new GoogleStrategy(
    {
      clientID: config.consumerKey,
      clientSecret: config.consumerSecret,
      callbackURL: config.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        displayName: profile.displayName,
        lastName: profile.family_name,
        firstName: profile.given_name,
        pictureURL: profile.picture,
        preferredLanguage: profile.language,
        email: profile.email,
        google: {
          id: profile.id,
          accessToken,
          refreshToken,
          pictureURL: profile.picture,
          language: profile.language,
          emails: profile.emails
        }
      };

      return done(null, user);
    }
  );
};
