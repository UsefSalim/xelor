import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from './sagas/rootSaga';
import ModelNameSlice from './slices/ModelName.slice';

// create a saga middleware
const sagaMiddleware = createSagaMiddleware();
// create a array of middlewares saga
const middleware = [sagaMiddleware];

const reducer = combineReducers({
  ModelNames: ModelNameSlice,
});

export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), ...middleware],
});
sagaMiddleware.run(watcherSaga);
