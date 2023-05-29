import React, { useEffect, useState } from "react";
import { login } from "@/apis/auth.api";
import { checkNullish } from "@/helpers/checkNullist";
import { useNavigate } from "react-router-dom";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REMEMBER,
  USER,
} from "@/constants/session";
import { getExpiredTime } from "@/utils/getExpiredTime";
import { notification } from "antd";
import { FailMsgTitle, SucessMsgTitle } from "@/constants/notification";
import { useAppStore } from "@/stores/useAppStore";

export const AuthContext = React.createContext({});

type NotificationType = "success" | "info" | "warning" | "error";

const AuthProvider = ({ children }: any) => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message: message,
      description: description,
      duration: 0.6,
    });
  };

  const logIn = async (params: any) => {
    const { email, password } = params;

    setIsLoading(true);
    try {
      // LOGIN THEN GET AND SET TOKENS
      const { data: loginPayload }: any = await login({
        email: email,
        password: password,
      });
      const accessTokenExp = getExpiredTime(loginPayload.accessToken);
      const refreshTokenExp = getExpiredTime(loginPayload.refreshToken);

      // GET AND SET USER INFO

      // SET LOGIN SUCCESSFULLY
      setLoggedIn(true);

      // NAVIGATE TO HOME PAGE
      setIsLoading(false);
      if (!isLoading) {
        openNotificationWithIcon(
          "success",
          SucessMsgTitle,
          "Login successfully!"
        );
      }
    } catch (error: any) {
      setIsLoading(false);
      error.message.slice(0, 3).forEach((item: string) => {
        api["error"]({
          message: FailMsgTitle,
          description: item,
        });
      });
    }
  };

  const logOut = () => {
    setIsLoading(true);

    // CLEAR STORAGE

    // SET LOGOUT SUCCESSFULLY
    setLoggedIn(false);

    // NAVIGATE TO LOGIN PAGE
    setIsLoading(false);
    if (!isLoading) {
      openNotificationWithIcon(
        "success",
        SucessMsgTitle,
        "Logout successfully!"
      );
      navigate("/auth/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        logIn,
        setLoggedIn,
      }}
    >
      {contextHolder}
      <>{children}</>
    </AuthContext.Provider>
  );
};
export default AuthProvider;
