import { Request } from "express";
import { VerifyCallback } from "passport-linkedin-oauth2";
import User from "../../classes/User";
import LinkedInProfile from "../../classes/LinkedInProfile";
import LinkedInInfo from "../../classes/LinkedInInfo";

export default async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: LinkedInProfile,
  done: VerifyCallback
) => {
  const linkedIn = new LinkedInInfo(profile)

  const user:User = {
    displayName: linkedIn.displayName,
    lastName: linkedIn.lastName,
    firstName: linkedIn.firstName,
    pictureURL: linkedIn.pictureURL,
    preferredLanguage: linkedIn.preferredLanguage,
    email: linkedIn.emails[0],
  };

  return done(
    null,
    Object.assign(user, {
      google: Object.assign({}, user.google, {
        accessToken,
        refreshToken
      })
    })
  );
};
