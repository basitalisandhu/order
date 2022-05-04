import axios from "axios";
import getRoute from "api/apiRoutes";
import { deleteSession, isLoggedIn } from "utils/user";
import history from "utils/history";
import { API } from "api";
import toaster from "utils/toaster";

class AuthApi extends API {
  login = (username: string, password: string): Promise<any> => {
    const route = getRoute("login");
    return this.postRequest(route, { username, password });
  };
}

const Api = new AuthApi();

axios.interceptors.response.use(undefined, (error) => {
  const url = error.config.url;
  const skipRoutes = ["auth/", "user/newsletter"];
  if (
    error.response &&
    error.response.data &&
    error.response.data.status_code === 401 &&
    error.response.data.error === "Invalid token"
  ) {
    for (const route of skipRoutes) {
      if (url.includes(route)) return Promise.reject(error);
    }
    if (isLoggedIn()) {
      toaster.error("Token expired Login again");
    }
    deleteSession();
    history.push("/auth/login");
  }
  return Promise.reject(error);
});

export default Api;
