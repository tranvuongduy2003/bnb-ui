import React from "react";
import { logOut, login } from "@/apis/auth.api";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useAppStore } from "@/stores/useAppStore";
import { useAuthStore } from "@/stores/useAuthStore";

export const AuthContext = React.createContext({});

type NotificationType = "success" | "info" | "warning" | "error";

const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setProfile = useAuthStore((state) => state.setProfile);
  const reset = useAuthStore((state) => state.reset);

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
        onClose: () =>
          profile.role === "user"
            ? navigate("/")
            : profile.role === "admin"
            ? navigate("/admin/dashboard")
            : null,
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
        logout,
        logIn,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
export default AuthProvider;
