import { Document } from 'mongoose';
import User from '../classes/User';
import UserModel from '../models/UserModel';

export default async (users: Document[], userModel = UserModel): Promise<User> => {
  let newUser: User = users[0].toObject();

  const usersDeleted: any = [];
  for(let i=1; i<users.length; i++){
    const user = new User(users[i].toObject()).withoutEmptyProviders;
    usersDeleted.push(userModel.findByIdAndDelete(user._id));
    delete user._id;    
    newUser = Object.assign(newUser, user);
  }
  await Promise.all(usersDeleted);
  return newUser;
};