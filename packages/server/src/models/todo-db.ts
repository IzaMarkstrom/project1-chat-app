import { Schema, model } from "mongoose";
import { Post } from "@project1-chat-app/shared";

const PostSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  authorName: String,
  text: String,
  timeStamp: Date,
});

const PostModel = model<Post>("Post", PostSchema);

export const loadAllPosts = async (): Promise<Post[]> => {
  return PostModel.find({}).exec();
};

export const savePost = async (
  post: Post,
  userId: string,
  userName: string
): Promise<void> => {
  const newModel = new PostModel({
    text: post.text,
    authorId: userId,
    authorName: userName,
  });
  newModel.save();
};
