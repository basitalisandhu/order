const {
  REACT_APP_API_URL,
  REACT_APP_FRONTEND_URI,
  REACT_APP_GOOGLE_ANALYTICS_KEY,
  REACT_APP_SENTRY_URL,
} = process.env;

export const API_BASE_PATH: string =
  REACT_APP_API_URL || "https://api.sendplaza.nl";
export const FRONTEND_URI: string =
  REACT_APP_FRONTEND_URI || window.location.origin;
export const getBaseURL = (slug = "") => `${FRONTEND_URI}/${slug}`;
export const COOKIE_USER_TOKEN = "USER_SESSION";
export const GoogleAnalyticsKey = `${REACT_APP_GOOGLE_ANALYTICS_KEY}`;
export const SENTRY_URI = `${REACT_APP_SENTRY_URL}`;
export const ALLOW_LOGGING =
  REACT_APP_SENTRY_URL && REACT_APP_SENTRY_URL.toString() !== "" ? true : false;
export const LOGOUT_ON_API_401 = true;
/**
 * logout session if api response with status Code 401
 */
