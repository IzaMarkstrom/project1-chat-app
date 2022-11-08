import { User } from "@project1-chat-app/shared";
import React, { createContext, useState } from "react";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultState = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
};

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextProps>(defaultState);

export const UserContextProvider: React.FC<Props> = ({
  children,
  ...props
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
