import { Schema, model } from "mongoose";
import { User } from "@project1-chat-app/shared";

import bcrypt from "bcrypt";

const UserSchema = new Schema({
  username: String,
  password: { type: String, select: false },
  email: { type: String, unique: true },
  roles: [],
});

export const UserModel = model<User>("User", UserSchema);

export const saveNewUser = async (user: User): Promise<User> => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  const newModel = new UserModel(user);
  return newModel.save();
};

export const getUser = async (
  userId: string | undefined
): Promise<User | null> => {
  return UserModel.findById(userId).select("-password").exec();
};

export default UserModel;
