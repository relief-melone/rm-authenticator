import { Strategy as FacebookStrategy } from "passport-facebook";

import facebookConfig from "../../config/config.facebook";
import { getEnabled as GetEnabled } from "../../config/functions/getEnabled";
import { Database } from "../../classes/interface.database";
import FacebookStrategyMongodb from "./strategy.facebook.mongodb";
import FacebookStrategyDefault from "./strategy.facebook.default";

export default (
  config = facebookConfig,
  getEnabled = GetEnabled,
  facebookStrategyMongodb = FacebookStrategyMongodb,
  facebookStrategyDefault = FacebookStrategyDefault
) => {
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
        ],
        passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, done) => {
        if (getEnabled(Database.mongodb)) {
          return facebookStrategyMongodb(
            req,
            accessToken,
            refreshToken,
            profile,
            done
          );
        } else {
          return facebookStrategyDefault(
            req,
            accessToken,
            refreshToken,
            profile,
            done
          );
        }
      }
    );
  } else {
    throw "Config for Facebook Strategy supplied";
  }
};
