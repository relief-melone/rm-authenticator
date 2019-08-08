import { Request } from "express";
import { VerifyCallback } from "passport-google-oauth2";

export default async (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: VerifyCallback
) => {
  const google = {
    id: profile.id,
    pictureURL: profile.picture,
    language: profile.language,
    emails: profile.emails
  };

  const user = {
    displayName: profile.displayName,
    lastName: profile.family_name,
    firstName: profile.given_name,
    pictureURL: profile.picture,
    preferredLanguage: profile.language,
    email: profile.email,
    google
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
