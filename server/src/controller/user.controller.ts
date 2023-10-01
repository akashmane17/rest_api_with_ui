import { Request, Response } from 'express';
import log from '../utils/logger';
import {omit} from 'lodash';
import { createUser } from '../service/user.service';
import { CreateUserInput } from '../schema/user.schema';

/**
 * 
 * @param req http request
 * @param res http response
 * @returns if user created successfully then returns user else return error message
 */
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  return res.send(res.locals.user);
}