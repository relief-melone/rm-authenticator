import getProfilePicture from "./facebook/getProfilePicture";
import getFriendsCount from "./facebook/getFriendsCount";

export default async (req, accessToken, refreshToken, profile, done) => {
  const facebook = {
    id: profile.id,
    pictureURL: getProfilePicture(profile.id),
    emails: profile.emails ? profile.emails.map(m => m.value) : [],
    friends: {
      count: getFriendsCount(profile)
    }
  };
  const user = {
    displayName: profile.displayName,
    lastName: profile._json.last_name,
    firstName: profile._json.first_name,
    pictureURL: getProfilePicture(profile.id),
    preferredLanguage: null,
    email: profile._json.email,
    facebook
  };

  return done(
    null,
    Object.assign(user, {
      facebook: Object.assign({}, user.facebook, {
        accessToken,
        refreshToken
      })
    })
  );
};
