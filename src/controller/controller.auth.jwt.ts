import { Request, Response, NextFunction } from 'express';
import getJwt from '@/services/service.getJwt';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
  if(
    !req.session ||
    !req.session.passport ||
    !req.session.passport.user
  ) return res.status(403).send('Not Authenticated');
  try {
    const token = getJwt(req.session.passport.user);
    return res.json(token).send();
  } catch(err) {
    return res.status(403).send(err);
  }
};