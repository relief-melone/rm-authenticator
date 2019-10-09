import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") return res.status(200).send();
  next();
};
