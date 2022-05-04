/**
 * user.js is used to manage the user authorization cookies
 */
import Cookies from "universal-cookie";
import axios from "axios";
import { COOKIE_USER_TOKEN } from "config";

interface ILoginResponse {
  access_token: string;
}

export function isLoggedIn(): boolean {
  const cookies = new Cookies();
  return cookies.get(COOKIE_USER_TOKEN);
}

export function deleteSession(): void {
  const cookies = new Cookies();
  cookies.remove(COOKIE_USER_TOKEN, { path: "/" });
}

export function saveUserSession(user: ILoginResponse) {
  const cookies = new Cookies();
  const session = {
    // refresh: user.refresh || cookies.get(COOKIE_USER_TOKEN).refresh,
    access_token: user.access_token,
  };
  cookies.set(COOKIE_USER_TOKEN, session, { path: "/" });
  axios.defaults.headers.common.Authorization = `JWT ${user.access_token}`;
  // axios.defaults.headers.common.refresh = `${user.refresh}`;
}

export function getSession(): ILoginResponse {
  const cookies = new Cookies();
  return cookies.get(COOKIE_USER_TOKEN);
}

export function getRefreshToken(): string | null {
  // const session = getSession();
  // if (session && session.refresh) {
  //   return session.refresh;
  // }
  return null;
}

export function initSession() {
  const user = getSession();
  axios.defaults.headers.common.Authorization = `JWT ${user.access_token}`;
  // axios.defaults.headers.common.refresh = `${user.refresh}`;
}
