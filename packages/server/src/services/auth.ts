import { Request, Response } from "express";
import { User } from "@project1-chat-app/shared";
import saveUser from "./user-service";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-db";

export type TokenPayload = {
  userId: string;
};

export interface JwtRequest<T> extends Request<T> {
  jwt?: TokenPayload;
}

export const generateToken = (userId: string | undefined) => {
  const token = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET as string, {
    expiresIn: "1800s",
  });
  return token;
};

export const authUser = (req: JwtRequest<unknown>, res: Response, next: any) => {
  const token: string | undefined = req.header("authorization")?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      ) as TokenPayload;
      req.jwt = decoded;
      next();
    } catch {
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(401);
  }
};

export const authRegisterController = async (
  req: Request<User>,
  res: Response<string>
) => {
  const { username } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (userExists) {
    res.status(409);
    res.json("User already exists.");
  } else {
    try {
      const user = await saveUser(req.body);
      const userId = user._id;
      const token = generateToken(userId);
      res.status(200).json(token);
    } catch (e) {
      res.status(400);
      res.send(`Error: ${e}`);
    }
  }
};
