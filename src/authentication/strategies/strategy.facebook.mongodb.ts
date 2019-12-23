import getProfilePicture from './facebook/getProfilePicture';
import getFriendsCount from './facebook/getFriendsCount';
import User from '../../classes/User';
import updateUser from '../../services/updateUser';

export default async (req, accessToken, refreshToken, profile, done): Promise<void> => {

  const facebook = {
    id: profile.id,
    pictureURL: getProfilePicture(profile.id),
    emails: profile.emails ? profile.emails.map(m => m.value) : [],
    friends: {
      count: getFriendsCount(profile)
    }
  };
  const sessionUser = req.user
    ? new User(Object.assign({}, req.user, { facebook }))
    : new User({
      displayName: profile.displayName,
      lastName: profile._json.last_name,
      firstName: profile._json.first_name,
      pictureURL: getProfilePicture(profile.id),
      preferredLanguage: null,
      email: profile._json.email,
      facebook
    });

  const user = await updateUser(sessionUser);

  return done(
    null, 
    user
  );
};
