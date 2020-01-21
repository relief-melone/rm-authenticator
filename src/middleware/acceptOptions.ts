import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.method === 'OPTIONS') res.status(200).send();
  next();
};