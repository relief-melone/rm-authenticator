import { Strategy as FacebookStrategy } from "passport-facebook";

import facebookConfig from "../../config/config.facebook";
import getProfilePicture from "./facebook/getProfilePicture";

export default (config = facebookConfig) => {
  if ((config = facebookConfig)) {
    return new FacebookStrategy(
      {
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        profileFields: [
          "id",
          "displayName",
          "email",
          "birthday",
          "friends",
          "first_name",
          "last_name",
          "middle_name",
          "gender",
          "link"
        ]
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
          displayName: profile.displayName,
          lastName: profile._json.last_name,
          firstName: profile._json.first_name,
          pictureURL: getProfilePicture(profile.id),
          preferredLanguage: null,
          email: profile._json.email,
          facebook: {
            id: profile.id,
            accessToken,
            refreshToken,
            pictureURL: getProfilePicture(profile.id),
            emails: profile.emails,
            friendsCount: profile._json.friends.summary
          }
        };
        return done(null, user);
      }
    );
  } else {
    throw "Config for Facebook Strategy supplied";
  }
};
