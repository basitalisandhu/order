import {
  CREATE_CREDENTIAL,
  CREATE_LABELS,
  CREATE_POSTMEN_KEY,
  CREATE_SHIPPERS,
  DELETE_CREDENTIAL,
  DELETE_POSTMEN_KEY,
  DELETE_SHIPPERS,
  EDIT_ORDER,
  GET_CREDENTIALS,
  GET_LABELS,
  GET_ORDERS,
  GET_POSTMEN_KEYS,
  GET_SHIPPERS,
  SET_REDUX_KEY,
  SET_POSTMEN_KEY,
} from "state/types";

export const getOrdersAction = {
  STARTED: (append?: boolean) => ({
    type: GET_ORDERS.STARTED,
    payload: append,
  }),
  FULLFILLED: (orders) => ({ type: GET_ORDERS.FULLFILLED, payload: orders }),
  REJECTED: () => ({ type: GET_ORDERS.REJECTED }),
};

export const editOrderAction = (orderId, label) => ({
  type: EDIT_ORDER,
  payload: { orderId, label },
});

export const setReduxKey = (key, value) => ({
  type: SET_REDUX_KEY,
  payload: { key, value },
});

export const setPostmenKeyAction = (value) => ({
  type: SET_POSTMEN_KEY,
  payload: value,
});

export const getShippersAction = {
  STARTED: () => ({ type: GET_SHIPPERS.STARTED }),
  FULLFILLED: (shippers) => ({
    type: GET_SHIPPERS.FULLFILLED,
    payload: shippers,
  }),
  REJECTED: () => ({ type: GET_SHIPPERS.REJECTED }),
};

export const createShipperAction = {
  STARTED: (shipper) => ({ type: CREATE_SHIPPERS.STARTED, payload: shipper }),
  FULLFILLED: () => ({ type: CREATE_SHIPPERS.FULLFILLED }),
};

export const deleteShipperAction = {
  STARTED: () => ({ type: DELETE_SHIPPERS.STARTED }),
  FULLFILLED: () => ({ type: DELETE_SHIPPERS.FULLFILLED }),
};

export const getLabelsAction = {
  STARTED: (append?: boolean) => ({
    type: GET_LABELS.STARTED,
    payload: append,
  }),
  FULLFILLED: (label) => ({
    type: GET_LABELS.FULLFILLED,
    payload: label,
  }),
  REJECTED: () => ({ type: GET_LABELS.REJECTED }),
};

export const createLabelsAction = {
  STARTED: (orders, shipper) => ({
    type: CREATE_LABELS.STARTED,
    payload: { orders, shipper },
  }),
  FULLFILLED: () => ({ type: CREATE_LABELS.FULLFILLED }),
};

export const createCredentialAction = {
  STARTED: (credential) => ({
    type: CREATE_CREDENTIAL.STARTED,
    payload: credential,
  }),
  FULLFILLED: () => ({ type: CREATE_CREDENTIAL.FULLFILLED }),
};

export const getCredentialsAction = {
  STARTED: () => ({
    type: GET_CREDENTIALS.STARTED,
  }),
  FULLFILLED: (credentials) => ({
    type: GET_CREDENTIALS.FULLFILLED,
    payload: credentials,
  }),
  REJECTED: () => ({ type: GET_CREDENTIALS.REJECTED }),
};

export const deleteCredentialsAction = {
  STARTED: () => ({ type: DELETE_CREDENTIAL.STARTED }),
  FULLFILLED: () => ({ type: DELETE_CREDENTIAL.FULLFILLED }),
};

export const createPostmenKeyAction = {
  STARTED: (key) => ({
    type: CREATE_POSTMEN_KEY.STARTED,
    payload: key,
  }),
  FULLFILLED: () => ({ type: CREATE_POSTMEN_KEY.FULLFILLED }),
};

export const getPostmenKeysAction = {
  STARTED: () => ({
    type: GET_POSTMEN_KEYS.STARTED,
  }),
  FULLFILLED: (keys) => ({
    type: GET_POSTMEN_KEYS.FULLFILLED,
    payload: keys,
  }),
  REJECTED: () => ({ type: GET_POSTMEN_KEYS.REJECTED }),
};

export const deletePostmenKeyAction = {
  STARTED: () => ({ type: DELETE_POSTMEN_KEY.STARTED }),
  FULLFILLED: () => ({ type: DELETE_POSTMEN_KEY.FULLFILLED }),
};
