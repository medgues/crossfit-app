import { combineReducers } from "redux";
import { Tuple, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { rootReducers } from "../reducers";

const reducers = combineReducers(rootReducers);
const persistConfig = {
  key: "root",
  // timeout: 0,
  storage: storageSession,
  // only persisted reducers
  whitelist: ["authentication", "settings"],
};

const middleware = () => new Tuple(thunk, logger);
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  devTools: true,
  middleware,
  // middleware: (getDefaultMiddleware) =>
  //   IS_PRODUCTION
  //     ? getDefaultMiddleware().concat(thunk)
  //     : getDefaultMiddleware().concat(thunk, logger),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
