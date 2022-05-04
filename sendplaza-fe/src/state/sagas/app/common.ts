import { call, takeLatest, put, select } from "redux-saga/effects";
import AuthApi from "api/auth";
import AppApi from "api/app";
import {
  getCredentialsAction,
  createCredentialAction,
  deleteCredentialsAction,
  getLabelsAction,
  getOrdersAction,
  getShippersAction,
  createShipperAction,
  deleteShipperAction,
  getPostmenKeysAction,
  createPostmenKeyAction,
  deletePostmenKeyAction,
  setReduxKey,
  setPostmenKeyAction,
  createLabelsAction,
} from "state/actions/app";
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
  LOGIN,
  SET_POSTMEN_KEY,
} from "state/types";

import { cleanObject, copy, downloadLink } from "utils";
import { deleteSession, saveUserSession } from "utils/user";
import history from "utils/history";
import toaster from "utils/toaster";
import { getKeyCredential, getKeyShipper } from "state/selectors/app";

function* auth(action) {
  try {
    const { username, password } = action.payload;
    const { access_token } = yield call(AuthApi.login, username, password);
    deleteSession();
    saveUserSession({ access_token });
    toaster.success("Login Sucessfully");
    return history.push("/");
  } catch (error) {
    toaster.error("Invalid Username or Password");
  }
}

function* getOrders(action) {
  try {
    const append = action.payload;
    let _orders = yield select((state) => state.app.common.orders);
    let page = 1;
    if (append) page = _orders.length / 50 + 1;
    let credential = yield select((state) => state.app.common.credential);
    let orders = yield call(AppApi.getOrders, credential, page);
    if (orders.length > 0) {
      if (append) orders = _orders.concat(orders);
      yield put(getOrdersAction.FULLFILLED(orders));
    } else {
      if (append) {
        yield put(getOrdersAction.REJECTED());
        toaster.error("No More orders");
      } else {
        yield put(getOrdersAction.FULLFILLED([]));
        toaster.error("No Order Found");
      }
    }
  } catch (error) {
    toaster.error("Failed to fetch orders. Please check your bol credentials");
    yield put(getOrdersAction.FULLFILLED([]));
  } finally {
    yield put(getOrdersAction.REJECTED());
  }
}

function* editOrder(action) {
  try {
    const { orderId, label } = action.payload;
    let orders = yield select((state) => state.app.common.orders);
    label.shipment.parcels = label.shipment.parcels.map((parcel) => {
      if (!parcel.weight.value) delete parcel.weight;
      if (!parcel.description) delete parcel.description;
      return parcel;
    });
    if (!label.shipment.ship_to.company_name)
      delete label.shipment.ship_to.company_name;
    const updatedOrders = orders.map((order) => {
      if (order.orderId === orderId) {
        order.label = {
          ...order.label,
          ...label,
          shipment: {
            ...order.label.shipment,
            ...label.shipment,
            ship_to: {
              ...order.label.shipment.ship_to,
              ...label.shipment.ship_to,
            },
          },
        };
      }
      return order;
    });
    yield put(getOrdersAction.FULLFILLED(updatedOrders));
  } catch (error) {}
}

function* getShippers() {
  try {
    let postmenKey = yield select((state) => state.app.common.postmenKey);
    const shippers = yield call(AppApi.getShippers, postmenKey);
    yield put(getShippersAction.FULLFILLED(shippers));
    const keyShipper = yield select(getKeyShipper);
    if (keyShipper) yield put(setReduxKey("shipper", keyShipper.id));
    else if (shippers.length > 0) {
      yield put(setReduxKey("shipper", shippers[0].id));
    }
  } catch (error) {
    toaster.error(
      "Failed to fetch shippers. Please check your postmen api key"
    );
    yield put(getShippersAction.FULLFILLED([]));
  } finally {
    yield put(getShippersAction.REJECTED());
  }
}

function* createShipper(action) {
  try {
    const shipper = action.payload;
    shipper.address = cleanObject(shipper.address);
    let postmenKey = yield select((state) => state.app.common.postmenKey);
    const res = yield call(AppApi.createShipper, postmenKey, shipper);
    let shippers = yield select((state) => state.app.common.shippers);
    shippers.unshift(res);

    yield put(getShippersAction.FULLFILLED(copy(shippers)));
    yield put(setReduxKey("shipper", res.id));
    yield put(setReduxKey("showShipperModel", false));
    toaster.success("Shipper Created Successfully");
  } catch (error) {
    toaster.error(error);
  } finally {
    yield put(createShipperAction.FULLFILLED());
  }
}

function* deleteShipper() {
  try {
    let id = yield select((state) => state.app.common.shipper);
    let postmenKey = yield select((state) => state.app.common.postmenKey);
    yield call(AppApi.delteShipper, postmenKey, id);
    let shippers = yield select((state) => state.app.common.shippers);
    shippers = shippers.filter((credential) => credential.id !== id);
    if (shippers.length > 0) yield put(setReduxKey("shipper", shippers[0].id));
    yield put(getShippersAction.FULLFILLED(shippers));
    toaster.success("Shipper Deleted Successfully");
  } catch (error) {
    toaster.error(error);
  } finally {
    yield put(deleteShipperAction.FULLFILLED());
  }
}

function* getLabels(action) {
  try {
    const append = action.payload;
    let label = yield select((state) => state.app.common.label);
    let postmenKey = yield select((state) => state.app.common.postmenKey);
    const labelResponse = yield call(
      AppApi.getLabels,
      postmenKey,
      label.limit,
      label.next_token
    );
    if (append)
      labelResponse.labels = label.labels.concat(labelResponse.labels);
    yield put(getLabelsAction.FULLFILLED(labelResponse));
  } catch (error) {
    toaster.error(error);
  } finally {
    yield put(getLabelsAction.REJECTED());
  }
}

function* createLabels(action) {
  try {
    const { orders } = action.payload;
    yield put(setReduxKey("orderErrors", []));
    const shippers = yield select((state) => state.app.common.shippers);
    let shipper = yield select((state) => state.app.common.shipper);
    shipper = shippers.find((s) => s.id === shipper);

    let ordersList = yield select((state) => state.app.common.orders);
    const labels = orders.map((order) => {
      const listOrder = ordersList.find((o) => o.orderId === order.orderId);
      listOrder.label.shipper_account.id = shipper.id;
      listOrder.label.shipment.ship_from = cleanObject(shipper.address);
      return {
        ...listOrder.label,
      };
    });
    let postmenKey = yield select((state) => state.app.common.postmenKey);
    let credential = yield select((state) => state.app.common.credential);
    const labelsRes = yield call(
      AppApi.createLabels,
      postmenKey,
      credential,
      labels
    );

    const url = labelsRes.bulk_label?.files?.label.url;
    if (url) downloadLink(url, "labels");
    if (labelsRes.errors && labelsRes.errors.length > 0) {
      yield put(setReduxKey("orderErrors", labelsRes.errors));
      yield put(setReduxKey("selectedTab", "labels"));
      yield put(setReduxKey("selectedTab", "open-orders"));
    } else yield put(setReduxKey("selectedTab", "labels"));
    // labelsRes.forEach((l) => {
    //   const url = l.data.files?.label.url;
    //   if (url) downloadLink(url, l.data.references[0]);
    // });

    yield put(getOrdersAction.STARTED());
    yield put(getLabelsAction.STARTED());
  } catch (error) {
    toaster.error(error);
  } finally {
    yield put(createLabelsAction.FULLFILLED());
  }
}

function* getCredentials() {
  try {
    const credentials = yield call(AppApi.getCredentials);
    yield put(getCredentialsAction.FULLFILLED(credentials));

    const keyCredential = yield select(getKeyCredential);
    if (keyCredential) yield put(setReduxKey("credential", keyCredential.id));
    else if (credentials.length > 0) {
      yield put(setReduxKey("credential", credentials[0].id));
    }
    let orders = yield select((state) => state.app.common.orders);
    if (orders.length === 0) yield put(getOrdersAction.STARTED());
  } catch (error) {
  } finally {
    yield put(getCredentialsAction.REJECTED());
  }
}

function* createCredential(action) {
  try {
    const credential = action.payload;
    const res = yield call(AppApi.createCredential, credential);
    let credentials = yield select((state) => state.app.common.credentials);
    credentials.push(res);
    yield put(getCredentialsAction.FULLFILLED(copy(credentials)));
    yield put(setReduxKey("credential", res.id));
    yield put(setReduxKey("showCredentialModel", false));
    yield put(getOrdersAction.STARTED());
    toaster.success("Credential Created Successfully");
  } catch (error) {
    toaster.error(error);
  } finally {
    yield put(createCredentialAction.FULLFILLED());
  }
}

function* deleteCredential() {
  try {
    let id = yield select((state) => state.app.common.credential);
    yield call(AppApi.delteCredential, id);
    let credentials = yield select((state) => state.app.common.credentials);
    credentials = credentials.filter(
      (credential) => Number(credential.id) !== Number(id)
    );
    if (credentials.length > 0)
      yield put(setReduxKey("credential", credentials[0].id));
    yield put(getCredentialsAction.FULLFILLED(credentials));
    toaster.success("Credential Deleted Successfully");
  } catch (error) {
    toaster.error(error);
  } finally {
    yield put(deleteCredentialsAction.FULLFILLED());
  }
}

function* getPostmenKeys() {
  try {
    const keys = yield call(AppApi.getPostmenKeys);
    yield put(getPostmenKeysAction.FULLFILLED(keys));
    if (keys.length > 0) {
      yield put(setPostmenKeyAction(keys[0].id));
    }
  } catch (error) {
  } finally {
    yield put(getPostmenKeysAction.REJECTED());
  }
}

function* createPostmenKey(action) {
  try {
    const key = action.payload;
    const res = yield call(AppApi.createPostmenKey, key);
    let postmenKeys = yield select((state) => state.app.common.postmenKeys);
    postmenKeys.push(res);
    yield put(getPostmenKeysAction.FULLFILLED(copy(postmenKeys)));
    yield put(setReduxKey("postmenKey", res.id));
    yield put(setReduxKey("showPostmenKeyModel", false));
    yield put(getShippersAction.STARTED());
    yield put(getLabelsAction.STARTED());
    toaster.success("Postmen Key Created Successfully");
  } catch (error) {
    toaster.error(error);
  } finally {
    yield put(createPostmenKeyAction.FULLFILLED());
  }
}

function* deletePostmenKey() {
  try {
    let postmenKey = yield select((state) => state.app.common.postmenKey);
    yield call(AppApi.deltePostmenKey, postmenKey);
    let postmenKeys = yield select((state) => state.app.common.postmenKeys);
    postmenKeys = postmenKeys.filter(
      (credential) => Number(credential.id) !== Number(postmenKey)
    );
    if (postmenKeys.length > 0) {
      yield put(setReduxKey("postmenKey", postmenKeys[0].id));
      yield put(getShippersAction.STARTED());
      yield put(getLabelsAction.STARTED());
    }
    yield put(getPostmenKeysAction.FULLFILLED(postmenKeys));
    toaster.success("Postmen Key Deleted Successfully");
  } catch (error) {
    toaster.error(error);
  } finally {
    yield put(deletePostmenKeyAction.FULLFILLED());
  }
}

function* setPostmenKey(action) {
  try {
    let postmenKey = action.payload;
    yield put(setReduxKey("postmenKey", postmenKey));
    const keyCredential = yield select(getKeyCredential);
    if (keyCredential) {
      yield put(setReduxKey("credential", keyCredential.id));
      yield put(getOrdersAction.STARTED());
    }
    yield put(getShippersAction.STARTED());
  } catch (error) {
    toaster.error(error);
  }
}

/// /////////// Watchers ///////////////////////
export function* watcherCommon() {
  yield takeLatest(LOGIN.STARTED, auth);

  yield takeLatest(GET_ORDERS.STARTED, getOrders);
  yield takeLatest(EDIT_ORDER, editOrder);
  yield takeLatest(GET_SHIPPERS.STARTED, getShippers);
  yield takeLatest(CREATE_SHIPPERS.STARTED, createShipper);
  yield takeLatest(DELETE_SHIPPERS.STARTED, deleteShipper);
  yield takeLatest(GET_LABELS.STARTED, getLabels);
  yield takeLatest(CREATE_LABELS.STARTED, createLabels);

  yield takeLatest(GET_CREDENTIALS.STARTED, getCredentials);
  yield takeLatest(CREATE_CREDENTIAL.STARTED, createCredential);
  yield takeLatest(DELETE_CREDENTIAL.STARTED, deleteCredential);

  yield takeLatest(GET_POSTMEN_KEYS.STARTED, getPostmenKeys);
  yield takeLatest(CREATE_POSTMEN_KEY.STARTED, createPostmenKey);
  yield takeLatest(DELETE_POSTMEN_KEY.STARTED, deletePostmenKey);
  yield takeLatest(SET_POSTMEN_KEY, setPostmenKey);
}
