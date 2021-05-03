import { takeLatest } from 'redux-saga/effects';
import {
  allModelNames,
  addModelName,
  deleteModelName,
  updateModelName,
} from '../slices/ModelName.slice';
import {
  handelGetModelName,
  handelAddModelName,
  handelDeleteModelName,
  handelUpdateModelName,
} from './handlers/ModelName.handler';

export function* watcherSaga() {
  yield takeLatest(allModelNames.type, handelGetModelName);
  yield takeLatest(addModelName.type, handelAddModelName);
  yield takeLatest(deleteModelName.type, handelDeleteModelName);
  yield takeLatest(updateModelName.type, handelUpdateModelName);
}
