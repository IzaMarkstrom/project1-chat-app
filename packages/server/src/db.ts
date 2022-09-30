import { Schema, model, connect } from "mongoose";
import Post from "@project1-chat-app/shared";
import User from "@project1-chat-app/shared";

const PostSchema = new Schema({
  author: String,
  text: String,
  timeStamp: Date,
});

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

const PostModel = model<Post>("Post", PostSchema);
const UserModel = model<User>("User", UserSchema);

export const setupMongoDb = async (url: string) => {
  await connect(url);
};

export const loadAllPosts = async (): Promise<Post[]> => {
  return PostModel.find({}).exec();
};

export const savePost = async (post: Post): Promise<void> => {
  const newModel = new PostModel(post);
  newModel.save();
};

export const saveNewUser = async (user: User): Promise<void> => {
  const newModel = new UserModel(user);
  newModel.save();
};

exports.UserModel = UserModel