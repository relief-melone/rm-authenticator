import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';

import linkedInConfig from '../../config/config.linkedin';
import LinkedInStrategyMongodb from './strategy.linkedin.mongodb';
import LinkedInStrategyDefault from './strategy.linkedin.default';
import { getEnabled as GetEnabled } from '../../config/functions/getEnabled';
import { Database } from '../../classes/Database';

export default (
  config = linkedInConfig,
  getEnabled = GetEnabled,
  linkedInStrategyMongodb = LinkedInStrategyMongodb,
  linkedInStrategyDefault = LinkedInStrategyDefault
): any => {
  if (config) {
    return new LinkedInStrategy(
      {
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        scope: config.scope,
        passReqToCallback: true,
        state: true
      },
      async (req, accessToken, refreshToken, profile, done) => {
        const strategy = getEnabled(Database.mongodb) ? linkedInStrategyMongodb : linkedInStrategyDefault;
        return strategy(req, accessToken, refreshToken, profile, done);
      }
    );
  } else {
    throw new Error('No Confg Supplied');
  }
};
