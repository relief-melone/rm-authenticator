import User from "../../models/UserModel";

import facebookConfig from "../../config/config.facebook";
import getProfilePicture from "./facebook/getProfilePicture";
import getFriendsCount from "./facebook/getFriendsCount";

export default async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log(req.user);
    let user;
    const facebook = {
      id: profile.id,
      pictureURL: getProfilePicture(profile.id),
      emails: profile.emails ? profile.emails.map(m => m.value) : [],
      friends: {
        count: getFriendsCount(profile)
      }
    };
    const sessionUser = req.user
      ? Object.assign({}, req.user, { facebook })
      : {
          displayName: profile.displayName,
          lastName: profile._json.last_name,
          firstName: profile._json.first_name,
          pictureURL: getProfilePicture(profile.id),
          preferredLanguage: null,
          email: profile._json.email,
          facebook
        };

    const dbUser = sessionUser._id
      ? await User.findOne({ _id: sessionUser._id })
      : await User.findOne({ email: sessionUser.email });

    if (!dbUser) {
      user = await User.create(sessionUser);
    } else {
      user = await User.findByIdAndUpdate(
        dbUser._id,
        {
          facebook: sessionUser.facebook
        },
        {
          new: true
        }
      );
    }

    if (!user)
      throw {
        msg: "User has been found but could not be updated!",
        code: 500
      };

    return done(
      null,
      Object.assign(user.toObject(), {
        facebook: Object.assign({}, user.facebook.toObject(), {
          accessToken,
          refreshToken
        })
      })
    );
  } catch (err) {
    throw err;
  }
};
