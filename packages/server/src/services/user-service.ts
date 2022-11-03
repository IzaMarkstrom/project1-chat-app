import { User } from "@project1-chat-app/shared";
import { saveNewUser } from "../models/user-db";

export const saveUser = async (newUser: User): Promise<any> => {
  return await saveNewUser(newUser);
};

export default saveUser;