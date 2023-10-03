import { Request, Response } from "express";
import log from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

/**
 * @desc Create User
 * @route POST /api/users
 * @access Public
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

/**
 * @desc Get Current User
 * @route GET /api/me
 * @access Private
 */
export async function getCurrentUser(req: Request, res: Response) {
  const user = res.locals.user;
  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
}
