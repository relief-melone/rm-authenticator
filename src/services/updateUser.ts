import UserModel from '../models/UserModel';
import User from '../classes/User';
import getUserQuery from '../services/getUserQuery';
import MergeUsersAndDeleteDuplicates from './mergeUsersAndDeleteDuplicates';

export default async (
  newUser: User, 
  userModel=UserModel, 
  mergeUsersAndDeleteDuplicates=MergeUsersAndDeleteDuplicates
): Promise<User> => {
  const query = getUserQuery(newUser.emails);
  let users = await userModel.find(query);
  if(users.length === 0) users = [await userModel.create(newUser)];
  const user = users.length > 1 
    ? await mergeUsersAndDeleteDuplicates(users) 
    : Object.assign(users[0].toObject(), newUser.withoutEmptyProviders);
  const dbUser = await userModel.findByIdAndUpdate(user._id, user, { new: true });
  if(!dbUser) throw { msg: 'updadeUser - User could not be updated', code: 500 };
  return dbUser.toObject();
};