import axios from 'axios';

const URL = '';

export function requestGetModelNames() {
  return axios.request({
    method: 'get',
    url: `${URL}/`,
  });
}
export function requestAddModelNames(action) {
  return axios.request({
    method: 'post',
    url: `${URL}/add`,
    data: {
      ...action.payload,
    },
  });
}
export function requestDeleteModelNames(action) {
  return axios.request({
    method: 'delete',
    url: `${URL}/${action.payload}`,
  });
}
export function requestUpdateModelNames(action) {
  console.log(action);
  return axios.request({
    method: 'put',
    url: `${URL}/${action.payload._id}`,
    data: {
      ...action.payload.data,
    },
  });
}
