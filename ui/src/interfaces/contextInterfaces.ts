import { ReactFragment } from "react";
import UserType from "../types/userType";

export interface ILogin {
  user: UserType;
  accessToken: string;
}

export interface IAuthContext {
  login: (login: ILogin) => void;
  isAdmin: () => boolean;
  getUser: () => UserType | undefined;
  setUser: (user: UserType) => void;
  logout: () => void;
  setCurrentUser: (user: UserType) => void;
}

export interface IAuthProviderProps {
  children: ReactFragment;
}
