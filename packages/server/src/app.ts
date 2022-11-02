import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { Post } from "@project1-chat-app/shared";
import { User } from "@project1-chat-app/shared";
const { UserModel } = require("./models/user-db");
import saveUser from "./services/user-service";
import { loadAllPosts, savePost } from "./models/todo-db";
import { setupMongoDb } from "./models/common";
import { authUser, generateToken } from "./services/auth";
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

const app: Application = express();

app.use(cors());
app.use(json());

const port: number = parseInt(process.env.SERVER_PORT || "4000");

app.get("/posts", authUser, async (req: Request, res: Response<Post[]>) => {
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

app.post("/register", async (req: Request<User>, res: Response<string>) => {
  const { username } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (userExists) {
    res.status(409).json("User already exists.");
  } else {
    try {
      const user = await saveUser(req.body);
      const userId = user._id;
      const token = generateToken(userId);
      console.log("token", token);
      res.status(200).json(token);
    } catch (e) {
      res.status(400).send(`Error: ${e}`);
    }
  }
});

app.post("/login", async (req: Request<User>, res: Response<any>) => {
  const { username, password } = req.body;

  const userExists = await UserModel.findOne({ username });
  if (userExists) {
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (validPassword) {
      try {
        const userId = userExists._id;
        const token = generateToken(userId);
        res.status(200).json(token);
      } catch (e) {
        res.status(400).send(`Error: ${e}`);
      }
    } else {
      res.status(403).send("Wrong password");
    }
  } else {
    res.status(403).send("Wrong username");
  }
});

app.listen(port, async function () {
  await setupMongoDb("mongodb://localhost/chatt-app");
  console.log(`App is listening on port ${port} !`);
});
