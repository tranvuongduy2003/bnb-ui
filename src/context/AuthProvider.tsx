import React, { useEffect, useRef } from "react";
import { login } from "@/apis/auth.api";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useAppStore } from "@/stores/useAppStore";
import { useAuthStore } from "@/stores/useAuthStore";
import initRequest from "@/services/initRequest";

export const AuthContext = React.createContext({});

type NotificationType = "success" | "info" | "warning" | "error";

const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setToken = useAuthStore((state) => state.setToken);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setProfile = useAuthStore((state) => state.setProfile);
  const reset = useAuthStore((state) => state.reset);

  const logOut = useRef<any>(null);

  const logIn = async (payload: any) => {
    setIsLoading(true);
    try {
      // LOGIN THEN GET AND SET TOKENS
      const { data: profile, token }: any = await login(payload);
      const { password, ...rest } = profile;

      // SAVE USER SESSION
      setToken(token);
      setProfile(rest);
      setLoggedIn(true);

      // NAVIGATE TO HOME PAGE
      setIsLoading(false);
      notification.success({
        message: "Login successfully!",
        duration: 0.25,
        onClose: () =>
          profile.role === "user"
            ? navigate("/")
            : profile.role === "admin"
            ? navigate("/admin/dashboard")
            : null,
      });
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      notification.error({
        message: error.message,
      });
    }
  };

  logOut.current = () => {
    setIsLoading(true);
    reset();

    setIsLoading(false);
    notification.success({
      message: "Logout successfully!",
      duration: 0.25,
      onClose: () => navigate("/auth/login"),
    });
  };

  useEffect(() => {
    initRequest(logOut.current);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logOut: logOut.current,
        logIn,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
export default AuthProvider;
