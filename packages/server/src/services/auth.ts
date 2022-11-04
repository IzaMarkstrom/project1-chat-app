import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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

export const authUser = (req: JwtRequest<any>, res: Response, next: any) => {
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
