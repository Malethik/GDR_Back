import { Router as createRouter } from "express";
import { FileController } from "../controller/file.controller.js";
import { FileInterceptor } from "../middleware/file.interceptor.js";
import createDebug from "debug";

const debug = createDebug("GDR:router:file");

export class FileRouter {
  router = createRouter();

  constructor(
    readonly controller: FileController,
    readonly fileInterceptor: FileInterceptor
  ) {
    this.router.post(
      "/upload",
      fileInterceptor.singleFile("avatar").bind(fileInterceptor),
      fileInterceptor.cloudinaryUpload.bind(fileInterceptor),
      controller.fileHandler.bind(controller)
    );
  }
}
