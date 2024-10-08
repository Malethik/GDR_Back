import {
  NextFunction,
  Request,
  Response,
  Router as createRouter,
} from "express";
import createDebug from "debug";
import { UserController } from "../controller/user.controller.js";
import { AuthInterceptor } from "../middleware/auth.interceptor.js";
import { FileInterceptor } from "../middleware/file.interceptor.js";

const debug = createDebug("GDR:router:user");

export class UserRouter {
  router = createRouter();
  constructor(
    readonly controller: UserController,
    readonly authInterceptor: AuthInterceptor,
    readonly fileInterceptor: FileInterceptor
  ) {
    debug("starting router");

    this.router.post(
      "/registrer",
      fileInterceptor.singleFile("avatar"),
      fileInterceptor.cloudinaryUpload,
      controller.create.bind(controller)
    );
    this.router.post("/login", controller.logIn.bind(controller));

    this.router.get("/", controller.getsAll.bind(controller));
    this.router.get("/:id", controller.getById.bind(controller));
    this.router.post("/", controller.create.bind(controller));
    this.router.patch("/:id", controller.update.bind(controller));

    this.router.delete(
      "/:id",
      authInterceptor.authentication.bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }

  userLoginOk(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: "you are logged in",
      ...req.body.payload,
    });
  }
}
