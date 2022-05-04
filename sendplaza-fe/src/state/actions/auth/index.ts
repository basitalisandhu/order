import {
  LOGIN,
  LOGOUT_USER,
  REGISTER,
  // BUSINESS_ADDRESS,
  // VERIFY_PHONE,
  SET_USER_STATE,
  // USER_AUTH_STATUS,
  // CHANGE_PASSWORD,
  // SHOW_CHANGE_PASSWORD,
} from "state/types";
import { deleteSession } from "utils/user";
import history from "utils/history";

export const loginAction = {
  STARTED: (username: string, password: string) => ({
    type: LOGIN.STARTED,
    payload: { username, password },
  }),
};

export const logoutAction = () => {
  deleteSession();
  history.push("/auth");
  return { type: LOGOUT_USER };
};

export const signupAction = {
  STARTED: (user) => ({ type: REGISTER.STARTED, payload: { ...user } }),
};

// export const businessAddressAction = {
//   STARTED: (address) => ({ type: BUSINESS_ADDRESS.STARTED, payload: address }),
// };

// export const verifyPhoneAction = {
//   STARTED: (verify) => ({ type: VERIFY_PHONE.STARTED, payload: verify }),
// };

// export const changePasswordAction = {
//   STARTED: (user) => ({ type: CHANGE_PASSWORD.STARTED, payload: { ...user } }),
// };

// export const userAuthStatusAction = {
//   STARTED: (email: string, statusToCheck: string) => ({
//     type: USER_AUTH_STATUS.STARTED,
//     payload: { statusToCheck, email },
//   }),
// };

export const setUserStateAction = (user: any) => ({
  type: SET_USER_STATE,
  payload: user,
});

// export const showChangePasswordAction = (isShow: boolean) => ({
//   type: SHOW_CHANGE_PASSWORD,
//   payload: isShow,
// });
