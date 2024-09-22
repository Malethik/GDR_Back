import { PrismaClient } from "@prisma/client";
import cors from "cors";
import createDebug from "debug";
import express, { Express } from "express";
import morgan from "morgan";

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
};
