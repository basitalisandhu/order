/* eslint-disable no-constant-condition */
import { all } from "redux-saga/effects";
import { app } from "state/sagas/app";

export default function* rootSaga() {
  const sagas = [...app];
  yield all(sagas);
}
