import { combineReducers } from "redux";
import app from "state/reducers/app";
import auth from "state/reducers/auth";

export default combineReducers({
  auth,
  app,
});
