import { getExpiredTime } from "./getExpiredTime";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAppStore } from "@/stores/useAppStore";
import { notification } from "antd";
import { Navigate } from "react-router-dom";
import { useCartStore } from "@/stores/useCartStore";

export const logOut = () => {
  const setIsLoading = useAppStore.getState().setIsLoading;
  const reset = useAuthStore.getState().reset;
  const resetCart = useCartStore.getState().reset;

  setIsLoading(true);
  reset();
  resetCart();

  setIsLoading(false);
  Navigate({ to: "/auth/login" });
};

export const getAccessToken = () => {
  const token = useAuthStore.getState().token.accessToken;
  return token;
};

export const getRefreshToken = () => {
  const token = useAuthStore.getState().token.refreshToken;
  return token;
};

export const handleRefreshToken = async () => {
  const refreshToken = getRefreshToken();
  const { data } = await axios.post("/auth/refresh", {
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const { token } = data.data;
  const setToken = useAuthStore.getState().setToken;
  setToken({ refreshToken, accessToken: token });
  return token;
};
