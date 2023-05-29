import { ILoginPayload } from "@/interfaces/IAuth";
import httpRequest from "@/services/httpRequest";

export const login = (data: ILoginPayload) => {
  return httpRequest.post("/auth/login", data);
};

export const forgotPassword = (data: any) => {
  return httpRequest.post("/auth/forget-password", data);
};

export const resetPassword = (data: any) => {
  return httpRequest.post("/auth/reset-password", data);
};
