import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void|Response => {
  if (
    !req.session ||
    !req.session.passport ||
    !req.session.passport.user
  ) return res.status(401).send();

  return res.json(req.session.passport.user).end();
};