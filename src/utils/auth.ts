import { ACCESS_TOKEN, REFRESH_TOKEN, REMEMBER } from "@/constants/session";
import { getExpiredTime } from "./getExpiredTime";
import axios from "axios";

// export const addItemToCookies = (key: any, value = "", expiredTime: number) => {
//   if (key) Cookies.set(key, value, { expires: expiredTime, path: "/" });
// };

// export const addItemToSession = (key: any, value = "") => {
//   if (key) sessionStorage.setItem(key, value);
// };

// export const removeItemFromCookies = (key: any) => {
//   Cookies.remove(key);
// };

// export const removeItemFromSession = (key: any) => {
//   sessionStorage.removeItem(key);
// };

// export const clearSession = () => {
//   sessionStorage.clear();
// };

// export const checkIsRemember = () => {
//   const isRemember = JSON.parse(Cookies.get(REMEMBER) as string);
//   return isRemember;
// };

// export const isValidToken = () => {
//   const tokenCookies = Cookies.get(ACCESS_TOKEN);
//   const tokenSession = sessionStorage.getItem(ACCESS_TOKEN);
//   // JWT decode & check whether token is invalid or expired
//   if (tokenCookies || tokenSession) return true;
//   return false;
// };

// export const getAccessToken = () => {
//   const tokenCookie = Cookies.get(ACCESS_TOKEN);
//   const tokenSession = sessionStorage.getItem(ACCESS_TOKEN);
//   const accessToken =
//     (tokenCookie && JSON.parse(tokenCookie)) ||
//     (tokenSession && JSON.parse(tokenSession));
//   return accessToken;
// };

// export const getRefreshToken = () => {
//   const tokenCookie = Cookies.get(REFRESH_TOKEN);
//   const tokenSession = sessionStorage.getItem(REFRESH_TOKEN);
//   const refreshToken =
//     (tokenCookie && JSON.parse(tokenCookie)) ||
//     (tokenSession && JSON.parse(tokenSession));
//   return refreshToken;
// };
// export const refreshToken = async () => {
//   try {
//     const refreshToken = getRefreshToken();
//     const { data } = await axios.get("/auth/refresh-token", {
//       baseURL: import.meta.env.VITE_SERVER_URL,
//       timeout: 20000,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     });
//     const accessToken = data.data.accessToken;
//     const tokenExp = getExpiredTime(accessToken);
//     if (checkIsRemember()) {
//       addItemToCookies(ACCESS_TOKEN, JSON.stringify(accessToken), tokenExp);
//     } else {
//       addItemToSession(ACCESS_TOKEN, JSON.stringify(accessToken));
//     }
//     return accessToken;
//   } catch (error) {
//     throw error;
//   }
// };
