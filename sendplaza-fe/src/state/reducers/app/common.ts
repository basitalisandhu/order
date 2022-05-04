import { app as initialState } from "state/reducers/initialState";
import {
  CLEAR_REDUX,
  GET_CREDENTIALS,
  GET_LABELS,
  GET_ORDERS,
  GET_POSTMEN_KEYS,
  GET_SHIPPERS,
  LOGOUT_USER,
  SET_REDUX_KEY,
} from "state/types";
import { IAction } from "state/types";

function reducer(state = initialState.common, action: IAction) {
  switch (action.type) {
    case GET_ORDERS.FULLFILLED:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_SHIPPERS.FULLFILLED:
      return {
        ...state,
        shippers: action.payload,
      };

    case GET_LABELS.FULLFILLED:
      return {
        ...state,
        label: action.payload,
      };

    case GET_CREDENTIALS.FULLFILLED:
      return {
        ...state,
        credentials: action.payload,
      };

    case GET_POSTMEN_KEYS.FULLFILLED:
      return {
        ...state,
        postmenKeys: action.payload,
      };
    case SET_REDUX_KEY:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case CLEAR_REDUX:
      return {
        ...state,
      };
    case LOGOUT_USER:
      return {
        ...initialState.common,
      };
    default:
  }
  return state;
}

export default reducer;
