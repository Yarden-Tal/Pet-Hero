import * as React from "react";
import { useState, ReactNode, useEffect, createContext } from "react";
// React-Router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Interfaces
import { IAuthContext, ILogin } from "../interfaces/contextInterfaces";
// Types
import UserType from "../types/userType";

const defaultValue = {
  login: (login: ILogin) => {},
  isAdmin: () => false,
  getUser: () => {
    return undefined;
  },
  logout: () => undefined,
  setCurrentUser: (user: UserType) => undefined,
  setUser: () => {
    return undefined;
  },
};

export const AuthContext = createContext<IAuthContext>(defaultValue);

const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<UserType | undefined>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);

    const u = localStorage.getItem("user");
    if (u) {
      const newUser = JSON.parse(u);
      setCurrentUser(newUser);
    }
  }, []);

  const navigate: NavigateFunction = useNavigate();

  const login = (login: ILogin): void => {
    setCurrentUser(login.user);
    setToken((prev: string | undefined): string => {
      return login.accessToken;
    });
    localStorage.setItem("token", login.accessToken);
    localStorage.setItem("user", JSON.stringify(login.user));
    navigate("/dashboard");
  };

  const isAdmin = (): boolean => {
    return currentUser ? currentUser.isAdmin : false;
  };

  const getUser = () => {
    return currentUser;
  };

  const setUser = (user: UserType): void => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ login, isAdmin, getUser, logout, setCurrentUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
