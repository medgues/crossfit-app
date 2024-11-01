/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "redux";
import { Tuple, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { rootReducers } from "../reducers";
import {
  createStateSyncMiddleware,
  initMessageListener,
  withReduxStateSync,
} from "redux-state-sync";

const reducers = combineReducers(rootReducers);
const persistConfig = {
  key: "root",
  // timeout: 0,
  storage: storageSession,
  // only persisted reducers
  whitelist: ["timer"],
};

const persistedReducer = withReduxStateSync(
  persistReducer(persistConfig, reducers)
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk, createStateSyncMiddleware(), logger) as Tuple<any>,
});

const persistor = persistStore(store);
initMessageListener(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
