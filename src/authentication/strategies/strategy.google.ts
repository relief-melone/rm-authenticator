import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import googleConfig from "../../config/config.google";
import User from "../../models/UserModel";
import GoogleStrategyMongodb from "./strategy.google.mongodb";
import GoogleStrategyDefault from "./strategy.google.default";
import { getEnabled as GetEnabled } from "../../config/functions/getEnabled";
import { Database } from "../../interfaces/interface.database";

export default (
  config = googleConfig,
  getEnabled = GetEnabled,
  googleStrategyMongodb = GoogleStrategyMongodb,
  googleStrategyDefault = GoogleStrategyDefault
) => {
  if (config) {
    return new GoogleStrategy(
      {
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, done) => {
        if (getEnabled(Database.mongodb)) {
          return googleStrategyMongodb(
            req,
            accessToken,
            refreshToken,
            profile,
            done
          );
        } else {
          return googleStrategyDefault(
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
    throw new Error("No Confg Supplied");
  }
};
