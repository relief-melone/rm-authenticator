import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import facebookConfig from "../config/config.facebook";
import mainConfig from "../config/config.main";
import mongodbConfig from "../config/config.mongodb";
import User from "../models/UserModel";
import UserClass from "../classes/User";

const router = Router();

router.get("/data/:Key", (req: Request, res: Response, next: NextFunction) => {
  if (!mongodbConfig)
    return res
      .status(416)
      .send({ msg: "No Database enabled on Authenticator" });

  if (!req.session) return res.status(401).send();
  if (!req.session.passport) return res.status(401).send();
  if (!req.session.passport.user) return res.status(401).send();

  const key = req.params.Key;
  const data = req.session.passport.user.data;
  if (!data[key]) return res.status(404).send();
  return res
    .status(200)
    .json(data[key])
    .end();
});

router.post(
  "/data/:Key",
  async (req: Request, res: Response, next: NextFunction) => {
    if (!mongodbConfig)
      return res
        .status(416)
        .send({ msg: "No Database enabled on Authenticator" });
    if (!req.session) return res.status(401).send();
    if (!req.session.passport) return res.status(401).send();
    if (!req.session.passport.user) return res.status(401).send();
    const key = req.params.Key;

    const newData = {};
    newData[key] = req.body;

    const sessionUser = req.session.passport.user;
    const userEmail = sessionUser.email;

    try {
      let user = await User.findOne({ email: userEmail });
      console.log(user);
      const updatedUserData = await User.findOneAndUpdate(
        { email: userEmail },
        newData,
        { new: true }
      );

      if (!updatedUserData) return res.status(404).send("User not found");
      return res.status(200).json(((updatedUserData as any) as UserClass).data);
    } catch (err) {
      console.log(err);
    }
  }
);

export default router;
