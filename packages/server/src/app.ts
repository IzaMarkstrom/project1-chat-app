import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import Post from "@project1-chat-app/shared";
import User from "@project1-chat-app/shared";
const { UserModel } = require("./db")
import saveUser from "./user-service"
import { setupMongoDb, loadAllPosts, savePost } from "./db";
const dotenv = require("dotenv").config();

const app: Application = express();

app.use(cors());
app.use(json());

const port: number = parseInt(process.env.SERVER_PORT || "4000");

app.get("/posts", async (req: Request, res: Response<Post[]>) => {
  const posts = await loadAllPosts();
  console.log("all posts", posts);
  res.send(posts);
});

app.post("/posts", async (req: Request<Post>, res: Response<Post[]>) => {
  const post = req.body;
  const savedPost = await savePost(post);
  const posts = await loadAllPosts();
  res.send(posts);
});

app.post("/register", async (req: Request<User>, res: Response<void>) => {
  const {username, password, email} = req.body

  const userExists = await UserModel.findOne({ username });
    
  if(userExists){
      res.status(403).json()
  } else {
    try {
      res.send(await saveUser(req.body))
    } catch (e) {
      res.sendStatus(400)
    }
  }
})

app.listen(port, async function () {
  await setupMongoDb("mongodb://localhost/chatt-app");
  console.log(`App is listening on port ${port} !`);
});
