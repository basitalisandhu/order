import React, { Suspense, lazy } from "react";
import map from "lodash/map";
import find from "lodash/find";
import each from "lodash/each";
import replace from "lodash/replace";
import { Switch, Redirect } from "react-router-dom";
import { IPrivateRoute } from "routes/types";
import PrivateRoute from "routes/PrivateRoute";
import UserRoute from "routes/UserRoute";
const App_Routes = lazy(() => import("pages/App"));
const AuthRoutes = lazy(() => import("pages/Auth"));

const RoutesHOC = (routes: any, DEFAULT_PATH: any) => {
  return function Component() {
    return (
      <Suspense fallback={<div></div>}>
        <Switch>
          {map(routes, (route) => {
            if (route.isPrivate) {
              return (
                <PrivateRoute
                  key={route.title}
                  title={route.title}
                  path={route.path}
                  component={route.component}
                  defaultPath={DEFAULT_PATH}
                />
              );
            }
            return (
              <UserRoute
                key={route.title}
                title={route.title}
                defaultPath={DEFAULT_PATH}
                path={route.path}
                component={route.component}
              />
            );
          })}
          <Redirect to={DEFAULT_PATH} />
        </Switch>
        {/* <ToastContainer
          transition={Fade}
          closeButton={<CloseButton />}
          position={toast.POSITION.BOTTOM_LEFT}
        /> */}
      </Suspense>
    );
  };
};

export const dashboardRoutes = {};

export const routes = {
  AUTH: {
    path: "/auth",
    title: "Login",
    component: AuthRoutes,
    isPrivate: false,
  },
  DASHBOARD: {
    path: "/",
    title: "Dashboard",
    component: App_Routes,
    isPrivate: true,
  },
};

const AppRoutes = RoutesHOC(routes, "/");
export default AppRoutes;

export const DEFAULT_PATH = "/dashboard";
export const USER_LANDING_PAGE = "/";

export const getTitleByPath = (path: string) => {
  const route = find(routes, (route: IPrivateRoute) => route.path === path);
  return route && route.title ? route.title : "";
};

export const createRoute = (url: string, params = {}): string => {
  each(params, (val: string, key: string) => {
    val = Array.isArray(val) ? val.join(",") : val;
    url = replace(url, new RegExp(`:${key}`, "g"), val);
  });
  return url;
};

export const isLandingPage = (history: any) => {
  const { pathname } = history.location;
  if (pathname) {
    const path = find(dashboardRoutes, (route) => route.path === pathname);
    return path === USER_LANDING_PAGE || typeof path === "undefined";
  }
  return true;
};
