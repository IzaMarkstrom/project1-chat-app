import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import Post from "@project1-chat-app/shared";

const app: Application = express();

app.use(cors());
app.use(json());

const port: number = parseInt(process.env.SERVER_PORT || "3002");

app.get("/posts", (req: Request, res: Response<Post>) => {
  res.send({
    id: "123",
    author: "Anna",
    text: "Hej hej",
    timeStamp: new Date(),
  });
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
