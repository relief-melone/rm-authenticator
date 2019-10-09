import User from "../../models/UserModel";
import { Request } from "express";

export default async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile,
  done
) => {
  let user;
  const google = {
    id: profile.id,
    pictureURL: profile.picture,
    language: profile.language,
    emails: profile.emails
  };

  const sessionUser = req.user
    ? Object.assign({}, req.user, { google })
    : {
        displayName: profile.displayName,
        lastName: profile.family_name,
        firstName: profile.given_name,
        pictureURL: profile.picture,
        preferredLanguage: profile.language,
        email: profile.email,
        google
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
        google: sessionUser.google
      },
      { new: true }
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
      google: Object.assign({}, user.google.toObject(), {
        accessToken,
        refreshToken
      })
    })
  );
};
