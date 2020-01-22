import { Request } from 'express';
import GoogleInfo from '../../classes/GoogleInfo';
import User from '../../classes/User';
import updateUser from '../../services/updateUser';


export default async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile,
  done
): Promise<void> => {  
  const google: GoogleInfo = {
    id: profile.id,
    pictureURL: profile.picture,
    language: profile.language,
    emails: profile.emails.map(mail => mail.value)
  };

  const sessionUser = req.user
    ? new User(Object.assign({}, req.user as any, { google }))
    : new User({
      displayName: profile.displayName,
      lastName: profile.family_name,
      firstName: profile.given_name,
      pictureURL: profile.picture,
      preferredLanguage: profile.language,
      email: profile.email,
      google
    });

  const user = await updateUser(sessionUser);

  return done(
    null, 
    user
  );
};
