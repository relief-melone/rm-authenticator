import { VerifyCallback } from 'passport-linkedin-oauth2';
import { Request } from 'express';
import LinkedInInfo from '../../classes/LinkedInInfo';
import LinkedInProfile from '../../classes/LinkedInProfile';
import User from '../../classes/User';
import updateUser from '../../services/updateUser';

export default async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: LinkedInProfile,
  done: VerifyCallback
): Promise<void> => {
  const linkedin = new LinkedInInfo(profile);

  const sessionUser = req.user
    ? new User(Object.assign({}, req.user as any, { linkedin }))
    : new User({
      displayName: linkedin.displayName,
      lastName: linkedin.lastName,
      firstName: linkedin.firstName,
      pictureURL: linkedin.pictureURL,
      preferredLanguage: linkedin.preferredLanguage,
      email: linkedin.emails[0],
      linkedin: linkedin
    });
  
  const user = await updateUser(sessionUser);

  return done(
    null, 
    user
  );
};
