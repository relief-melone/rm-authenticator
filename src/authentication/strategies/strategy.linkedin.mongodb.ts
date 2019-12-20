import UserModel from "../../models/UserModel";
import { VerifyCallback } from "passport-linkedin-oauth2"
import { Request } from "express";
import LinkedInInfo from "../../classes/LinkedInInfo";
import LinkedInProfile from "../../classes/LinkedInProfile";
import User from "../../classes/User";

export default async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: LinkedInProfile,
  done: VerifyCallback
) => {
  let user;
  const linkedIn = new LinkedInInfo(profile)

  const sessionUser = req.user
    ? Object.assign({}, req.user, { linkedin: linkedIn })
    : {
        displayName: linkedIn.displayName,
        lastName: linkedIn.lastName,
        firstName: linkedIn.firstName,
        pictureURL: linkedIn.pictureURL,
        preferredLanguage: linkedIn.preferredLanguage,
        email: linkedIn.emails[0],
        linkedin: linkedIn
      } as User;

  const dbUser = sessionUser._id
    ? await UserModel.findOne({ _id: sessionUser._id })
    : await UserModel.findOne({ email: sessionUser.email });

  if (!dbUser) {
    user = await UserModel.create(sessionUser);
  } else {
    user = await UserModel.findByIdAndUpdate(
      dbUser._id,
      {
        linkedin: sessionUser.linkedin
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
      linkedin: Object.assign({}, user.linkedin.toObject(), {
        accessToken,
        refreshToken
      })
    })
  );
};
