import { config } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";

config();

const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("response");
});

export default app;
