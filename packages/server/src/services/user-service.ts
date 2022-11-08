import { User } from "@project1-chat-app/shared";
import { getUser, saveNewUser } from "../models/user-db";

export const saveUser = async (newUser: User): Promise<any> =>
  saveNewUser(newUser);

export const getUserById = async (
  id: string | undefined
): Promise<User | null> => {
  return await getUser(id);
};

export default saveUser;
