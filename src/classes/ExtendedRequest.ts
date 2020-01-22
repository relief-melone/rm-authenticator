import { Request } from 'express';
import User from './User';

export default interface ExtendedRequest extends Request {
  user: User;
}