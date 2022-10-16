import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

export const generateToken = (full_name: string) => {
    return jwt.sign({username: full_name}, process.env.REACT_APP_TOKEN_SECRET, { expiresIn: '1800s' });
};

export const authUser = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    console.log(req.body.full_name, "req body")
    
    if (token == null) return res.status(401).send("No token exist.")
    
    jwt.verify(token, process.env.REACT_APP_TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err, "error verify")
    
      if (err) return res.status(403).send("Token not verifiable")

      req.body = user
    
      next()
    })
}

