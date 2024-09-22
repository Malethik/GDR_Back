import { PrismaClient } from "@prisma/client";
import cors from "cors";
import createDebug from "debug";
import express, { Express } from "express";
import morgan from "morgan";
import { AuthInterceptor } from "./middleware/auth.interceptor.js";
import { FileInterceptor } from "./middleware/file.interceptor.js";
import { UserController } from "./controller/user.controller.js";
import { UserRouter } from "./router/user.router.js";
import { UserRepo } from "./repo/user.sql.repo.js";
import { FileController } from "./controller/file.controller.js";
import { FileRouter } from "./router/file.router.js";
import { ErrorsMidleware } from "./middleware/error.middleware.js";

const debug = createDebug("GDR:App");

export const createApp = () => {
  debug("Creating App...");
  const app = express();
  return app;
};

export const startApp = (app: Express, Prisma: PrismaClient) => {
  debug("Starting App...");
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.static("./public"));
  const authInterceptor = new AuthInterceptor();
  const fileInterceptor = new FileInterceptor();

  const userRepo = new UserRepo(Prisma);
  const userController = new UserController(userRepo);
  const userRouter = new UserRouter(
    userController,
    authInterceptor,
    fileInterceptor
  );
  app.use("/user", userRouter.router);
  const filesController = new FileController();
  const fileRouter = new FileRouter(filesController, fileInterceptor);
  app.use("/files", fileRouter.router);
  const errormiddleware = new ErrorsMidleware();
  app.use(errormiddleware.handle.bind(errormiddleware));
};
