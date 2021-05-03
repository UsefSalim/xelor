import { call, put } from 'redux-saga/effects';
import {
  requestGetModelNames,
  requestAddModelNames,
  requestDeleteModelNames,
  requestUpdateModelNames,
} from '../requests/ModelName.request';
import { getModelName, allModelNames } from '../../slices/ModelName.slice';

export function* handelGetModelName(action) {
  try {
    const response = yield call(requestGetModelNames);
    const { data } = response;
    yield put(getModelName(data));
  } catch (error) {
    console.log(error);
  }
}
export function* handelAddModelName(action) {
  try {
    yield call(requestAddModelNames, action);
    yield put(allModelNames());
  } catch (error) {
    console.log(error);
  }
}
export function* handelDeleteModelName(action) {
  try {
    yield call(requestDeleteModelNames, action);
    yield put(allModelNames());
  } catch (error) {
    console.log(error);
  }
}
export function* handelUpdateModelName(action) {
  try {
    yield call(requestUpdateModelNames, action);
    yield put(allModelNames());
  } catch (error) {
    console.log(error);
  }
}
