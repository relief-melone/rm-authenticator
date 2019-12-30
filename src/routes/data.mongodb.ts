import { Router, Request, Response } from 'express';
import mongodbConfig from '../config/config.mongodb';
import UserModel from '../models/UserModel';
import User from '../classes/User';
import getDataForUser from '../services/getDataForUser';

const router = Router();

router.get('/data/:Key', async (req: Request, res: Response) => {
  if (!mongodbConfig())
    return res
      .status(416)
      .send({ msg: 'No Database enabled on Authenticator' });

  if (!req.session) return res.status(401).send();
  if (!req.session.passport) return res.status(401).send();
  if (!req.session.passport.user) return res.status(401).send();

  const key = req.params.Key;
  const data = await getDataForUser(req.user._id);
  if (!data) return res.status(404).send();
  if (!data[key]) return res.status(404).send();
  return res
    .status(200)
    .json(data[key])
    .end();
});

router.post(
  '/data/:Key',
  async (req: Request, res: Response) => {
    if (!mongodbConfig())
      return res
        .status(416)
        .send({ msg: 'No Database enabled on Authenticator' });
    if (!req.session) return res.status(401).send();
    if (!req.session.passport) return res.status(401).send();
    if (!req.session.passport.user) return res.status(401).send();
    const key = req.params.Key;

    const newData = { data: {} };
    newData.data[key] = req.body;

    const sessionUser = req.session.passport.user;
    const userEmail = sessionUser.email;

    try {
      const user = await UserModel.findOne({ email: userEmail });
      console.log(user);
      const updatedUserData = await UserModel.findOneAndUpdate(
        { email: userEmail },
        newData,
        { new: true }
      );

      if (!updatedUserData) return res.status(404).send('User not found');
      return res.status(200).json(((updatedUserData as any).data[key] as User));
    } catch (err) {
      console.log(err);
    }
  }
);

export default router;
