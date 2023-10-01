import express, { Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import validateResource from './middleware/validateResources';
import { createUserSchema } from './schema/user.schema';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';

const router = express.Router();

// healthCheck 
router.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).send('All Good');
});

// create User
router.post(
  '/api/users',
  validateResource(createUserSchema),
  createUserHandler
);

// create Session
router.post(
  '/api/sessions',
  validateResource(createSessionSchema),
  createUserSessionHandler
);

// get Session
router.get('/api/sessions',requireUser, getUserSessionsHandler);

// delete Session
router.delete('/api/sessions',requireUser, deleteSessionHandler);

export default router;
