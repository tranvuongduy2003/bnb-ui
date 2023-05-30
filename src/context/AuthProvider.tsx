import React, { useEffect, useState } from "react";
import { logOut, login } from "@/apis/auth.api";
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
import { useAuthStore } from "@/stores/useAuthStore";

export const AuthContext = React.createContext({});

type NotificationType = "success" | "info" | "warning" | "error";

const AuthProvider = ({ children }: any) => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setProfile = useAuthStore((state) => state.setProfile);
  const reset = useAuthStore((state) => state.reset);

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

  const logIn = async (payload: any) => {
    setIsLoading(true);
    try {
      // LOGIN THEN GET AND SET TOKENS
      const { data: profile }: any = await login(payload);
      const { password, ...rest } = profile;

      // SAVE USER SESSION
      setProfile(rest);

      setLoggedIn(true);

      // NAVIGATE TO HOME PAGE
      setIsLoading(false);
      notification.success({
        message: "Login successfully!",
        duration: 0.25,
        onClose: () => navigate("/"),
      });
    } catch (error: any) {
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // CALL API LOGOUT
      await logOut();

      // CLEAR STORAGE
      reset();

      // SET LOGOUT SUCCESSFULLY
      setLoggedIn(false);

      // NAVIGATE TO LOGIN PAGE
      setIsLoading(false);
      notification.success({
        message: "Logout successfully!",
        duration: 0.25,
        onClose: () => navigate("/auth/login"),
      });
    } catch (error: any) {
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        logout,
        logIn,
      }}
    >
      {contextHolder}
      <>{children}</>
    </AuthContext.Provider>
  );
};
export default AuthProvider;
