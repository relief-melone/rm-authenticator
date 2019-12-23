import UserModel from '../models/UserModel';

export default async (userid: string): Promise<Record<string,any>> => {
  const user = await UserModel.findById(userid);
  if(!user) return {};
  return user.toObject().data;
};