import { object, string, TypeOf } from 'zod';

/**
 * creating session schema with zod
 * body contains email and password
 * this schema will be used for validateResource middleware 
 */
export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

// creating Type of CreateSessionInput to pass in our controller
export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body'];
