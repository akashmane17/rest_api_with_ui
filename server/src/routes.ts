import express, { Request, Response } from "express";
import {
  createUserHandler,
  getCurrentUser,
} from "./controller/user.controller";
import validateResource from "./middleware/validateResources";
import { createUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";

const router = express.Router();

// healthCheck
router.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).send("All Good");
});

// create User
router.post(
  "/api/users",
  validateResource(createUserSchema),
  createUserHandler
);

// get User
router.get("/api/me", requireUser, getCurrentUser);

// create Session
router.post(
  "/api/sessions",
  validateResource(createSessionSchema),
  createUserSessionHandler
);

// get Session
router.get("/api/sessions", requireUser, getUserSessionsHandler);

// delete Session
router.delete("/api/sessions", requireUser, deleteSessionHandler);

//========================= PRODUCT ROUTES ================================

router.post(
  "/api/products",
  [requireUser, validateResource(createProductSchema)],
  createProductHandler
);

router.put(
  "/api/products/:productId",
  [requireUser, validateResource(updateProductSchema)],
  updateProductHandler
);

router.get(
  "/api/products/:productId",
  validateResource(getProductSchema),
  getProductHandler
);

router.delete(
  "/api/products/:productId",
  [requireUser, validateResource(deleteProductSchema)],
  deleteProductHandler
);

export default router;
