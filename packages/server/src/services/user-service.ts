import User from "@project1-chat-app/shared/src/user";
import { saveNewUser } from "../models/user-db"

export const saveUser = async (newUser: User): Promise<any> => {
  
  await saveNewUser(newUser);

};

export default saveUser;