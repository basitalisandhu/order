import each from "lodash/each";
import replace from "lodash/replace";
import { API_BASE_PATH } from "config";

const ROUTES_OBJ = {
  // APP
  getOrders: `${API_BASE_PATH}/orders/<credential>?page=<page>`,
  shippers: `${API_BASE_PATH}/shippers/<postmenKey>`,
  getLabels: `${API_BASE_PATH}/labels/<postmenKey>?limit=<limit>&next_token=<next_token>`,
  createLabels: `${API_BASE_PATH}/labels/<postmenKey>/<bolId>`,
  credentials: `${API_BASE_PATH}/credentials`,
  postmenKeys: `${API_BASE_PATH}/postmenKeys`,
  deleteCredential: `${API_BASE_PATH}/credentials/<id>`,
  deleteShipper: `${API_BASE_PATH}/shippers/<postmenKey>/<id>`,
  deletePostmenKey: `${API_BASE_PATH}/postmenKeys/<id>`,

  // AUTH
  login: `${API_BASE_PATH}/auth`,
};

export type ROUTES = keyof typeof ROUTES_OBJ;
/**
 * getRoute creates the URL through provided routeName & params arguments
 * @param  {string} routeName   any object name of ROUTES_OBJ e.g. login
 * @param  {Object} [params={}] param values replace with strings present <...>.
 * @return {string}             URL
 */
const getRoute = (routeName: ROUTES, params = {}): string => {
  let url: string = ROUTES_OBJ[routeName];
  each(params, (val: string, key: string) => {
    val = Array.isArray(val) ? val.join(",") : val;
    url = replace(url, new RegExp(`<${key}>`, "g"), encodeURIComponent(val));
    if (typeof val === "undefined" || val === "" || val === null) {
      url = url
        .replace(new RegExp(`&${key}=`, "g"), "")
        .replace(new RegExp(`${key}=`, "g"), "")
        .replace("undefined", "")
        .replace("null", "");
    }
  });
  const regex = /<(.*?)>/;
  let matched: any = [];
  do {
    matched = regex.exec(url);
    if (matched) {
      url = replace(url, new RegExp(matched[0], "g"), "");
      url = url
        .replace(new RegExp(`&${matched[1]}=`, "g"), "")
        .replace(new RegExp(`${matched[1]}=`, "g"), "");
    }
  } while (matched);
  return url;
};

export default getRoute;
