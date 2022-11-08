import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { Post } from "@project1-chat-app/shared";
import { User } from "@project1-chat-app/shared";
import { UserModel } from "./models/user-db";
import { loadAllPosts, savePost } from "./models/todo-db";
import { setupMongoDb } from "./models/common";
import {
  authRegisterController,
  authUser,
  generateToken,
  JwtRequest,
} from "./services/auth";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getUserById } from "./services/user-service";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(json());

const port: number = parseInt(process.env.SERVER_PORT || "4000", 10);

app.get("/posts", authUser, async (req: Request, res: Response<Post[]>) => {
  const posts = await loadAllPosts();
  res.send(posts);
});

app.post(
  "/posts",
  authUser,
  async (req: JwtRequest<Post>, res: Response<Post[]>) => {
    const post = req.body;
    const userId = req.jwt?.userId;
    console.log(userId);
    const userName = await getUserById(userId);

    await savePost(post, userId as string, userName?.username as string);
    const posts = await loadAllPosts();
    res.send(posts);
  }
);

app.post("/register", authRegisterController);

app.post("/login", async (req: Request<User>, res: Response<any>) => {
  const { username, password } = req.body;

  const userExists = await UserModel.findOne({ username }).select("+password");
  if (userExists) {
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (validPassword) {
      try {
        const userId = userExists._id;
        const token = generateToken(userId as unknown as string);
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

app.get(
  "/getuser",
  authUser,
  async (req: JwtRequest<User>, res: Response<any>) => {
    const userId = req.jwt?.userId;
    try {
      const user = await getUserById(userId);
      if (userId) {
        res.status(200).send(user);
      }
    } catch (error) {
      res.status(403).send(error);
    }
  }
);

const MONGO_URL: string =
  process.env.MONGO_URL || "mongodb://localhost:27017/chat-app";

app.listen(port, async () => {
  await setupMongoDb(MONGO_URL);
  console.log(`App is listening on port ${port} !`);
});
