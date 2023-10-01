import { NextFunction, Request, Response, query } from 'express';
import { AnyZodObject } from 'zod';

// this will execute our function schema and that'll return another function which is taking req, res, and next parameters
// It is called currying, Currying is a function that takes one argument at a time and returns a new function expecting the next argument inline.
const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

  export default validateResource;
