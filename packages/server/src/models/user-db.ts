import { Schema, model } from "mongoose";
import { User } from "@project1-chat-app/shared";
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
  roles: [],
});

const UserModel = model<User>("User", UserSchema);

export const saveNewUser = async (user: User): Promise<User> => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  const newModel = new UserModel(user);
  return newModel.save();
};

exports.UserModel = UserModel;
