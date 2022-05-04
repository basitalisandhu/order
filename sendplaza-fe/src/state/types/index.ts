import { API_TYPE } from "utils";

export interface IAction {
  type: string;
  payload?: any;
}

/* -------------------------------------------------------------------------- */
/*                                     APP                                    */
/* -------------------------------------------------------------------------- */
export const GET_ORDERS = API_TYPE("GET_ORDERS");
export const EDIT_ORDER = "EDIT_ORDER";
export const SET_REDUX_KEY = "SET_REDUX_KEY";
export const SET_POSTMEN_KEY = "SET_POSTMEN_KEY";

export const GET_SHIPPERS = API_TYPE("GET_SHIPPERS");
export const CREATE_SHIPPERS = API_TYPE("CREATE_SHIPPERS");
export const DELETE_SHIPPERS = API_TYPE("DELETE_SHIPPERS");

export const GET_LABELS = API_TYPE("GET_LABELS");
export const CREATE_LABELS = API_TYPE("CREATE_LABELS");

export const GET_CREDENTIALS = API_TYPE("GET_CREDENTIALS");
export const CREATE_CREDENTIAL = API_TYPE("CREATE_CREDENTIAL");
export const DELETE_CREDENTIAL = API_TYPE("DELETE_CREDENTIAL");

export const GET_POSTMEN_KEYS = API_TYPE("GET_POSTMEN_KEYS");
export const CREATE_POSTMEN_KEY = API_TYPE("CREATE_POSTMEN_KEY");
export const DELETE_POSTMEN_KEY = API_TYPE("DELETE_POSTMEN_KEY");

/* --------------------------------- LOADER --------------------------------- */
export const APP = API_TYPE("APP");
export const CLEAR_LOADING = "CLEAR_LOADING";

/* -------------------------------------------------------------------------- */
/*                                    AUTH                                    */
/* -------------------------------------------------------------------------- */
export const LOGIN = API_TYPE("LOGIN");
export const REGISTER = API_TYPE("REGISTER");
export const SET_USER_STATE = "SET_USER_STATE";
export const LOGOUT_USER = "LOGOUT_USER";

export const CLEAR_REDUX = "CLEAR_REDUX";
