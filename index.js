import Express from "express";
import mssql from "mssql";
import { sqlConfig, config } from "./db/config.js";
import { appRoutes } from "./route/route.js";
import bodyParser from "body-parser";

const app = Express();
app.use(bodyParser.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

appRoutes(app);

app.get("/", async (req, res) => {
  res.send("hello world");
});
app.listen(config.port, () => {
  console.log(`Server is running on ${config.url}`);
});

export default app;
