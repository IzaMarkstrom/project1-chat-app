import { Schema, model } from "mongoose";
import User from "@project1-chat-app/shared/src/user";
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  roles: []
});

const UserModel = model<User>("User", UserSchema);

export const saveNewUser = async (user: User): Promise<void> => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt)

  const newModel = new UserModel(user);
  newModel.save();
};

// UserSchema.pre("save", async function(this: User, next: any) {
//   console.log(this.password)
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt)
//   next();
// });

exports.UserModel = UserModel