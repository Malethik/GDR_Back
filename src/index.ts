import createDebug from "debug";
import { createApp, startApp } from "./app";
import { createServer } from "http";
import "dotenv/config";
import { dbConnect } from "./tools/db.connect.js";

const debug = createDebug("GDR:Server");

const port = process.env.PORT || 3400;
const app = createApp();
const server = createServer(app);

dbConnect()
  .then((prisma) => {
    startApp(app, prisma);
    server.listen(port);
  })

  .catch((error) => {
    server.emit("error", error);
  });

server.on("error", (error) => {
  debug("Error", error);
  process.exit(1);
});
server.on("listening", () => {
  debug(`Server open on port:${port}`);
});
