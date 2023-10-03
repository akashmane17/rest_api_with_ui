import { NextFunction, Request, Response } from "express";

// use this on the routes where user is required
// return 403 if user is not present on res.local.user
const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  
  if(!user) {
    return res.sendStatus(403);
  }

  return next();
}

export default requireUser;