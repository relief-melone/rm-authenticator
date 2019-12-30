import { Request } from 'express';
import { VerifyCallback } from 'passport-linkedin-oauth2';
import User from '../../classes/User';
import LinkedInProfile from '../../classes/LinkedInProfile';
import LinkedInInfo from '../../classes/LinkedInInfo';

export default async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: LinkedInProfile,
  done: VerifyCallback
): Promise<void> => {
  const linkedin = new LinkedInInfo(profile);

  const user: User = new User({
    displayName: linkedin.displayName,
    lastName: linkedin.lastName,
    firstName: linkedin.firstName,
    pictureURL: linkedin.pictureURL,
    preferredLanguage: linkedin.preferredLanguage,
    email: linkedin.emails[0],
    linkedin
  });

  return done(
    null,
    user
  );
};
